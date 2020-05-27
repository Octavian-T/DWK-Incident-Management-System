from flask import *
from flask_sqlalchemy import SQLAlchemy

from Database import *

app = Flask(__name__)

app.config['JSON_SORT_KEYS'] = False
app.config['SQLALCHEMY_TRACK_NOTIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'

db = SQLAlchemy(app)

@app.route('/incident/<id>', methods = ['GET'])
def get_incident(id):
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
            return json.dumps({'success':False}), 404, {'ContentType':'application/json'}

@app.route('/incident/<id>/updates', methods=['GET'])
def get_incident_updates(id):
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
        return json.dumps({'success':False}), 404, {'ContentType':'application/json'}

@app.route('/account/<username>', methods = ['GET'])
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
            return json.dumps({'success':False}), 404, {'ContentType':'application/json'}

@app.route('/account/<id>/incidents', methods=['GET'])
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
        return json.dumps({'success':False}), 404, {'ContentType':'application/json'}


@app.route('/department/<id>', methods=['GET'])
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
            return json.dumps({'success':False}), 404, {'ContentType':'application/json'}

@app.route('/department/<id>/members')
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
        return json.dumps({'success':False}), 404, {'ContentType':'application/json'}

@app.route('/department/<id>/incidents', methods=['GET'])
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
        return json.dumps({'success':False}), 404, {'ContentType':'application/json'}


if __name__ == "__main__":
    app.run(host = "0.0.0.0", port=80)
