import datetime
from flask import *
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from Database import *

from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)

app = Flask(__name__)

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
@jwt_required
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
                    'investigatingDepartmentID':incident.investigatingDepartmentID,
                    'description':incident.description,
                    'timeRaised':incident.timeRaised,
                    'priority':incident.priority,
                    'severity':incident.severity,
                    'impact':incident.impact,
                    'status':incident.status,
                    'timeCompleted':incident.timeCompleted
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
                    'timeRaised':incident.timeRaised,
                    'priority':incident.priority,
                    'severity':incident.severity,
                    'impact':incident.impact,
                    'status':incident.status,
                    'timeCompleted':incident.timeCompleted
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
            affectedID = request.get_json()['affectedID'],
            investigatingDepartmentID = request.get_json()['investigatingDepartmentID'],
            description = request.get_json()['description'],
            timeRaised = datetime.datetime.now(),
            priority = request.get_json()['priority'],
            severity = request.get_json()['severity'],
            impact = request.get_json()['impact'],
            status = request.get_json()['status'])
        db.session.add(newIncident)
        db.session.commit()
        return json.dumps({'success':True}), 200, {'ContentType':'application/json'}
        # else:
        #     return json.dumps({'success':False}), 400, {'ContentType':'application/json'}
    elif request.method == 'PUT':
        data = request.get_json()
        timedate = data['timeCompleted']
        date = timedate[:10].split('-')
        time = timedate[11:].split(':')
        db.engine.execute('UPDATE Incident Set investigatingDepartmentID = {}, description = "{}", priority = "{}", severity = "{}", impact = "{}", status = "{}", timeCompleted = "{}";'.format(
            data['investigatingDepartmentID'],
            data['description'],
            str(data['priority']),
            str(data['severity']),
            str(data['impact']),
            str(data['status']),
            datetime.datetime(int(date[0]), int(date[1]), int(date[2]), int(time[0]), int(time[1]))))
        return json.dumps({'success':True}), 200, {'ContentType':'application/json'}
    else:
        return json.dumps({'success':False}), 400, {'ContentType':'application/json'}

@app.route('/api/incident/<id>/updates', methods=['GET', 'POST'])
def get_incident_updates(id):
    if request.method == 'GET':
        updates = IncidentUpdate.query.filter_by(incidentID = id).all()
        if updates is not None:
            all_updates = {'data':[]}
            for update in updates:
                this_update = {
                    'updateID':update.updateID,
                    'technicianID':update.technicianID,
                    'incidentID':update.incidentID,
                    'date':update.date,
                    'description':update.description
                }
                all_updates['data'].append(this_update)
            return all_updates
        else:
            return json.dumps({'success':False}), 400, {'ContentType':'application/json'}
    elif request.method == 'POST':
        if request.form is not None:
            update = IncidentUpdate(technicianID = request.form['technicianID'], incidentID = request.form['incidentID'], date = datetime.datetime.now(), description = request.form['description'])
            db.session.add(update)
            db.session.commit()
            return json.dumps({'success':True}), 200, {'ContentType':'application/json'}
        else:
            return json.dumps({'success':False}), 400, {'ContentType':'application/json'}
    else:
        return json.dumps({'success':False}), 400, {'ContentType':'application/json'}

@app.route('/api/incident/<id>/notes', methods=['GET'])
def get_incident_notes(id):
    notes = Note.query.filter_by(incidentID=id).all()

    if notes is not None:
        
        all_notes = { 'data': [] }
        for note in notes:
            all_notes['data'].append({
                'noteID': note.noteID,
                'incidentID': note.incidentID,
                'author': note.author,
                'text': note.text,
                'date': note.date
            })
        return all_notes

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
                'incidentID':incident.incidentID,
                'raisedID':incident.raisedID,
                'affectedID':incident.affectedID,
                'investigatingDepartmentID':incident.investigatingDepartmentID,
                'description':incident.description,
                'timeRaised':incident.timeRaised,
                'priority':incident.priority,
                'severity':incident.severity,
                'impact':incident.impact,
                'status':incident.status,
                'timeCompleted':incident.timeCompleted
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
                'departmentID':department.departmentID,
                'name':department.name
            }
            all_departments['data'].append(this_department)
        return all_departments
    else:
        department = Department.query.get(id)
        if department is not None:
            return {
                'departmentID':department.departmentID,
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
                'incidentID':incident.incidentID,
                'raisedID':incident.raisedID,
                'affectedID':incident.affectedID,
                'investigatingDepartmentID':incident.investigatingDepartmentID,
                'description':incident.description,
                'timeRaised':incident.timeRaised,
                'priority':incident.priority,
                'severity':incident.severity,
                'impact':incident.impact,
                'status':incident.status,
                'timeCompleted':incident.timeCompleted
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
    return response

if __name__ == "__main__":
    app.run(host = "0.0.0.0", port=80)
