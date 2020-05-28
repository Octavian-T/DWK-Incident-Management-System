import datetime
from flask import *
from flask_sqlalchemy import SQLAlchemy
from Database import *

app = Flask(__name__)

app.config['JSON_SORT_KEYS'] = False
app.config['SQLALCHEMY_TRACK_NOTIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
app.secret_key = "d3ab1e7d7fa97fe46796219d07c4b05d5f1ac4704a43ba7aeb"

db = SQLAlchemy(app)

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
        if request.form is not None:
            newIncident = Incident(
                raisedID = request.form['raisedID'],
                affectedID = request.form['affectedID'],
                investigatingDepartmentID = request.form['investigatingDepartmentID'],
                description = request.form['description'],
                timeRaised = datetime.datetime.now(),
                priority = request.form['priority'],
                severity = request.form['severity'],
                impact = request.form['impact'],
                status = request.form['status'])
            db.session.add(newIncident)
            db.session.commit()
            return json.dumps({'success':True}), 200, {'ContentType':'application/json'}
        else:
            return json.dumps({'success':False}), 400, {'ContentType':'application/json'}
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
    incidents = Incident.query.filter_by(raisedID = id).all()
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

@app.route('/api/login', methods=["POST"])
def login():
    if request.method == "POST":
        data = request.get_json()
        if data is not None:
            print('>>>>>>>>>>>>>>{} logged in!'.format(data['username']))
            account = Account.query.get(data['username'])
            department = DepartmentMember.query.filter_by(username = data['username']).first()
            if account is not None and account.password == data['password']:
                return json.dumps({'username':account.username,'departmentID':department}), 200, {'ContentType':'application/json'}
            else:
                return json.dumps({'username':0}), 401, {'ContentType':'application/json'}
        else:
            return json.dumps({'success':False}), 400, {'ContentType':'application/json'}

@app.after_request
def after_request(response):
    header = response.headers
    header['Access-Control-Allow-Origin'] = '*'
    return response

if __name__ == "__main__":
    app.run(host = "0.0.0.0", port=80)
