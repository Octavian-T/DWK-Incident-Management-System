#pylint: disable=W0614
import datetime
from flask import * 
from flask_cors import CORS 
from flask_sqlalchemy import SQLAlchemy
from Database import *
from reports import reports

from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)

app = Flask(__name__)
app.register_blueprint(reports)

app.config['JSON_SORT_KEYS'] = False
app.config['SQLALCHEMY_TRACK_NOTIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
app.secret_key = "d3ab1e7d7fa97fe46796219d07c4b05d5f1ac4704a43ba7aeb"

app.config['JWT_SECRET_KEY'] = 'dwk-plc'
jwt = JWTManager(app)

db = SQLAlchemy(app)
CORS(app)

#incidents

@app.route('/api/incident/<id>', methods = ['GET', 'POST', 'PUT'])
def get_incident(id):
    if request.method == 'GET':
        if id == 'all':
            incidents = Incident.query.all()
            all_incidents = {'data':[]}
            for incident in incidents:
                this_incident = {
                    'incidentID':incident.incidentID,
                    'raisedID':incident.raisedID,
                    'affectedID':incident.affectedID,
                    'investigatingDepartmentID': int(incident.investigatingDepartmentID),
                    'description':incident.description,
                    'timeRaised': str(incident.timeRaised),
                    'priority':incident.priority,
                    'severity':incident.severity,
                    'impact':incident.impact,
                    'status':incident.status,
                    'timeCompleted': str(incident.timeCompleted)
                }
                all_incidents['data'].append(this_incident)
            return all_incidents
        else:
            incident = Incident.query.get(id)
            if incident is not None:
                return {
                    'incidentID':incident.incidentID,
                    'raisedID':incident.raisedID,
                    'affectedID':incident.affectedID,
                    'investigatingDepartmentID':incident.investigatingDepartmentID,
                    'description':incident.description,
                    'timeRaised': str(incident.timeRaised),
                    'priority':incident.priority,
                    'severity':incident.severity,
                    'impact':incident.impact,
                    'status':incident.status,
                    'timeComplete': str(incident.timeCompleted)
                }
            else:
                return json.dumps({'success':False}), 400, {'ContentType':'application/json'}
    elif request.method == 'POST' and id == 'new':
        # if request.form is not None:
        #     newIncident = Incident(
        #         raisedID = request.form['raisedID'],
        #         affectedID = request.form['affectedID'],
        #         investigatingDepartmentID = request.form['investigatingDepartmentID'],
        #         description = request.form['description'],
        #         timeRaised = datetime.datetime.now(),
        #         priority = request.form['priority'],
        #         severity = request.form['severity'],
        #         impact = request.form['impact'],
        #         status = request.form['status'])
        #     db.session.add(newIncident)
        #     db.session.commit()
        #     return json.dumps({'success':True}), 200, {'ContentType':'application/json'}
        # elif response:
        newIncident = Incident(
            raisedID = request.get_json()['raisedID'],
            affectedID = request.get_json()['affectedID'] if 'affectedID' in request.get_json() else request.get_json()['raisedID'],
            investigatingDepartmentID = request.get_json()['investigatingDepartmentID'] if 'investigatingDepartmentID' in request.get_json() else '',
            description = request.get_json()['description'],
            timeRaised = datetime.datetime.now(),
            priority = request.get_json()['priority'] if 'priority' in request.get_json() else '',
            severity = request.get_json()['severity'] if 'severity' in request.get_json() else '',
            impact = request.get_json()['impact'] if 'impact' in request.get_json() else '',
            status = request.get_json()['status'] if 'priority' in request.get_json() else '',
            timeCompleted = datetime.datetime.now() if 'closeIncident' in request.get_json() else None)
        db.session.add(newIncident)
        db.session.commit()
        

        return json.dumps({'success':True}), 200, {'ContentType':'application/json'}
        # else:
        #     return json.dumps({'success':False}), 400, {'ContentType':'application/json'}
    elif request.method == 'PUT':
        data = request.get_json()
        sql_string = '  '
        if 'priority' in data:
            sql_string = sql_string + 'priority = "{}", '.format(str(data['priority']))
        if 'severity' in data:
            sql_string = sql_string + 'severity = "{}", '.format(str(data['severity']))
        if 'impact' in data:
            sql_string = sql_string + 'impact = "{}", '.format(str(data['impact']))
        if 'status' in data:
            sql_string = sql_string + 'status = "{}", '.format(str(data['status']))
        if 'investigatingDepartmentID' in data:
            sql_string = sql_string + 'investigatingDepartmentID = {}, '.format(data['investigatingDepartmentID'])
        if 'closeIncident' in data:
            sql_string = sql_string + 'timeCompleted = "{}" '.format(str(datetime.datetime.now()))
        sql_string = sql_string[1:-1]
        db.engine.execute('UPDATE Incident Set {} WHERE incidentID = "{}";'.format(sql_string[1:-1],id))
        return json.dumps({'success':True}), 200, {'ContentType':'application/json'}
    else:
        return json.dumps({'success':False}), 400, {'ContentType':'application/json'}

@app.route('/api/incident/<id>/updates', methods = ['GET'])
def get_incident_updates(id):
    updates = IncidentUpdate.query.filter_by(incidentID=id).all()

    if updates is not None:
        
        all_updates = { 'data': [] }
        for update in updates:
            all_updates['data'].append({
                'updateID': int(update.updateID),
                'incidentID': int(update.incidentID),
                'technicianID': update.technicianID,
                'description': update.description,
                'timeSpent': int(update.timeSpent),
                'date': str(update.date)
            })
        return all_updates
    else:
        return json.dumps({'success':False}), 400, {'ContentType':'application/json'}

@app.route('/api/incident/<id>/notes', methods=['GET'])
def get_incident_notes(id):
    notes = Note.query.filter_by(incidentID=id).all()

    if notes is not None:
        
        all_notes = { 'data': [] }
        for note in notes:
            all_notes['data'].append({
                'noteID': int(note.noteID),
                'incidentID': int(note.incidentID),
                'author': note.author,
                'text': note.text,
                'date': str(note.date)
            })
        return all_notes

    else:
        return json.dumps({'success':False}), 400, {'ContentType':'application/json'}

@app.route('/api/incident/major', methods=['GET'])
def get_incident_major():
    majorIncidents = Incident.query.filter((Incident.priority=="P2") | (Incident.priority=="P3")).all()
    if majorIncidents is not None:
        
        allMajorIncidents = { 'data': [] }
        for incident in majorIncidents:
            allMajorIncidents['data'].append({
                'incidentID':int(incident.incidentID),
                'raisedID':incident.raisedID,
                'affectedID':incident.affectedID,
                'investigatingDepartmentID':int(incident.investigatingDepartmentID),
                'description':incident.description,
                'timeRaised':str(incident.timeRaised),
                'priority':incident.priority,
                'severity':incident.severity,
                'impact':incident.impact,
                'status':incident.status,
                'timeCompleted': str(incident.timeCompleted)
            })
        return allMajorIncidents

    else:
        return json.dumps({'success':False}), 400, {'ContentType':'application/json'}

@app.route('/api/incident/request/<id>', methods=['GET', 'POST', 'DELETE'])
def incident_request(id):
    if request.method == 'GET':
        if id == "all":
            incidentRequests = IncidentRequestPriority.query.all()
            if incidentRequests is not None:
                
                allIncidentRequests = { 'data': [] }
                for incidentRequest in incidentRequests:
                    allIncidentRequests['data'].append({
                        'requestID':int(incidentRequest.requestID),
                        'incidentID': int(incidentRequest.incidentID),
                        'username':incidentRequest.username,
                        'priority':incidentRequest.priority,
                        'severity':incidentRequest.severity,
                        'impact':incidentRequest.impact,
                        'reason': incidentRequest.reason,
                        'timeRequested':str(incidentRequest.timeRequested)
                    })
                return allIncidentRequests
            else:
                return json.dumps({'success':False}), 400, {'ContentType':'application/json'}
        else:
            incidentRequest = IncidentRequestPriority.query.get(id)
            if incidentRequest is not None:
                return {
                    'requestID':int(incidentRequest.requestID),
                    'incidentID': int(incidentRequest.incidentID),
                    'username':incidentRequest.username,
                    'priority':incidentRequest.priority,
                    'severity':incidentRequest.severity,
                    'impact':incidentRequest.impact,
                    'reason': incidentRequest.reason,
                    'timeRequested':str(incidentRequest.timeRequested)
                }
            else:
                return json.dumps({'success':False}), 400, {'ContentType':'application/json'}
    
    elif request.method == 'POST' and id == 'new':
        newIncidentRequest = IncidentRequestPriority(
            incidentID = request.get_json()['incidentID'],
            username = request.get_json()['username'],
            priority = request.get_json()['priority'],
            severity = request.get_json()['severity'],
            impact = request.get_json()['impact'],
            reason = request.get_json()['reason'],
            timeRequested = datetime.datetime.now()
        )
        db.session.add(newIncidentRequest)
        db.session.commit()
        return json.dumps({'success':True}), 200, {'ContentType':'application/json'}

    elif request.method == 'DELETE':
        data = request.get_json()
        IncidentRequest = IncidentRequestPriority.query.filter_by(requestID=data['requestID']).first()
        # print(IncidentRequest)
        db.engine.execute('DELETE FROM incident_request_priority WHERE requestID = %s' % data['requestID'])
        if(data['approved'] == True):
            # print('UPDATE Incident SET Priority = "%s", Severity = "%s", Impact = "%s" WHERE IncidentID = %d' % (data['newPriority'], data['newSeverity'], data['newImpact'], IncidentRequest.incidentID))
            db.engine.execute('UPDATE Incident SET Priority = "%s", Severity = "%s", Impact = "%s" WHERE IncidentID = %d' % (data['newPriority'], data['newSeverity'], data['newImpact'], IncidentRequest.incidentID))
        return json.dumps({'success':True}), 200, {'ContentType':'application/json'}

    else:
        return json.dumps({'success':False}), 400, {'ContentType':'application/json'}

#accounts

@app.route('/api/account/<username>', methods = ['GET'])
def get_account(username):
    if username == 'all':
        accounts = Account.query.all()
        all_accounts = {'data':[]}
        for account in accounts:
            role = DepartmentMember.query.filter_by(username = account.username).first()
            this_account = {
                'username':account.username,
                'firstName':account.firstName,
                'lastName':account.lastName,
                'role':role.role
            }
            all_accounts['data'].append(this_account)
        return all_accounts
    else:
        account = Account.query.get(username)
        if account is not None:
            role = DepartmentMember.query.filter_by(username = account.username).first()
            return {
                'username':account.username,
                'firstName':account.firstName,
                'lastName':account.lastName,
                'role':role.role
            }
        else:
            return json.dumps({'success':False}), 400, {'ContentType':'application/json'}

@app.route('/api/account/<id>/incidents', methods=['GET'])
def get_account_incidents(id):
    incidents = Incident.query.filter((Incident.raisedID == id) | (Incident.affectedID == id)).all()
    if incidents is not None:
        all_incidents = {'data':[]}
        for incident in incidents:
            this_incident = {
                'incidentID':int(incident.incidentID),
                'raisedID':incident.raisedID,
                'affectedID':incident.affectedID,
                'investigatingDepartmentID':int(incident.investigatingDepartmentID),
                'description':incident.description,
                'timeRaised':str(incident.timeRaised),
                'priority':incident.priority,
                'severity':incident.severity,
                'impact':incident.impact,
                'status':incident.status,
                'timeCompleted':str(incident.timeCompleted)
            }
            all_incidents['data'].append(this_incident)
        return all_incidents
    else:
        return json.dumps({'success':False}), 400, {'ContentType':'application/json'}

#department

@app.route('/api/department/<id>', methods=['GET'])
def get_department(id):
    if id == 'all':
        departments = Department.query.all()
        all_departments = {'data':[]}
        for department in departments:
            this_department = {
                'departmentID':int(department.departmentID),
                'name':department.name
            }
            all_departments['data'].append(this_department)
        return all_departments
    else:
        department = Department.query.get(id)
        if department is not None:
            return {
                'departmentID':int(department.departmentID),
                'name':department.name
            }
        else:
            return json.dumps({'success':False}), 400, {'ContentType':'application/json'}

@app.route('/api/department/<id>/members')
def get_department_members(id):
        members = DepartmentMember.query.filter_by(departmentID = id).all()
        if members is not None:
            all_members = {'data':[]}
            for member in members:
                current_member = Account.query.filter_by(username = member.username).first()
                this_member = {
                    'username':current_member.username,
                    'firstName':current_member.firstName,
                    'lastName':current_member.lastName
                }
                all_members['data'].append(this_member)
            return all_members
        else:
            return json.dumps({'success':False}), 400, {'ContentType':'application/json'}

@app.route('/api/department/<id>/incidents', methods=['GET'])
def get_department_incidents(id):
    incidents = Incident.query.filter_by(investigatingDepartmentID = id).all()
    if incidents is not None:
        all_incidents = {'data':[]}
        for incident in incidents:
            this_incident = {
                'incidentID':int(incident.incidentID),
                'raisedID':incident.raisedID,
                'affectedID':incident.affectedID,
                'investigatingDepartmentID':int(incident.investigatingDepartmentID),
                'description':incident.description,
                'timeRaised':str(incident.timeRaised),
                'priority':incident.priority,
                'severity':incident.severity,
                'impact':incident.impact,
                'status':incident.status,
                'timeCompleted':str(incident.timeCompleted)
            }
            all_incidents['data'].append(this_incident)
        return all_incidents
    else:
        return json.dumps({'success':False}), 400, {'ContentType':'application/json'}


#Notes
@app.route('/api/note/new', methods=['POST'])
def get_incident_note():
    note = Note(
        incidentID=request.get_json()['incidentID'],
        author=request.get_json()['author'],
        text=request.get_json()['text'],
        date=datetime.datetime.now()
    )
    db.session.add(note)
    db.session.commit()

    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}





#Login
@app.route('/api/login', methods=["POST"])
def login():
    username = request.get_json()['username']
    password = request.get_json()['password']

    if username is not None and password is not None:
        account = Account.query.get(username)

        if account is not None and account.password == password:
            print("%s logged in" % (account.username))
            departmentMember = DepartmentMember.query.filter_by(username = username).first()
            department = Department.query.filter_by(departmentID=departmentMember.departmentID).first()
            access_token = create_access_token(identity=username)

            return jsonify({'access_token': access_token, 'username': account.username, 'firstName': account.firstName, 'lastName': account.lastName, 'departmentID': departmentMember.departmentID, 'department': department.name}), 200, {'ContentType':'application/json'}

        else: 
            return jsonify({'success': False, 'error': 'Incorrect username/password'}), 401, {'ContentType':'application/json'}

    else:
        return jsonify({'success': False, 'error': 'Missing username/password'}), 400, {'ContentType':'application/json'}

@app.after_request
def after_request(response):
    header = response.headers
    header['Access-Control-Allow-Origin'] = '*'
    header['Access-Control-Allow-Headers'] = '*'
    header['Access-Control-Allow-Methods'] = '*'
    return response

if __name__ == "__main__":
    app.run(host = "0.0.0.0", port=80)
