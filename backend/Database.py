from server import db

class Account(db.Model):
    username = db.Column(db.String(32), primary_key=True, unique=True, nullable=False)
    password = db.Column(db.String(32), nullable=False)
    firstName = db.Column(db.String(32), nullable=False)
    lastName = db.Column(db.String(32), nullable=False)

class Department(db.Model):
    departmentID = db.Column(db.Integer(), primary_key=True, unique=True, nullable=False)
    name = db.Column(db.String(32), nullable=False)

class DepartmentMember(db.Model):
    username = db.Column(db.String(32), db.ForeignKey('account.username'), primary_key=True, unique=True, nullable=False)
    departmentID = db.Column(db.Integer(), db.ForeignKey('department.departmentID'), primary_key=True, nullable=False)
    role = db.Column(db.String(32))

class Incident(db.Model):
    incidentID = db.Column(db.Integer(), primary_key=True, unique=True, nullable=False)
    raisedID = db.Column(db.String(32), db.ForeignKey('account.username'))
    affectedID = db.Column(db.String(32), db.ForeignKey('account.username'))
    investigatingDepartmentID = db.Column(db.String(32), db.ForeignKey('department.departmentID'))
    investigatingTechnicianID = db.Column(db.String(32), db.ForeignKey('account.username'))
    description = db.Column(db.String(250))
    timeRaised = db.Column(db.DateTime())
    priority = db.Column(db.String(2), nullable=False)
    severity = db.Column(db.String(2), nullable=False)
    impact = db.Column(db.String(2), nullable=False)
    status = db.Column(db.String(32), nullable=False)
    timeCompleted = db.Column(db.DateTime())

class IncidentUpdate(db.Model):
    updateID = db.Column(db.Integer(), primary_key=True, unique=True, nullable=False)
    incidentID = db.Column(db.Integer(), db.ForeignKey('incident.incidentID'), nullable=False)
    technicianID = db.Column(db.String(32), db.ForeignKey('account.username'), nullable=False)
    # priority = db.Column(db.String(2), nullable=False)
    # severity = db.Column(db.String(2), nullable=False)
    # impact = db.Column(db.String(2), nullable=False)
    description = db.Column(db.String(250))
    updateType = db.Column(db.String(32))
    timeSpent = db.Column(db.Integer(), nullable=False)
    date = db.Column(db.DateTime())

class Unit(db.Model):
    unitID = db.Column(db.Integer(), primary_key=True, unique=True, nullable=False)
    departmentID = db.Column(db.Integer(), db.ForeignKey('department.departmentID'), nullable=False)
    unitname = db.Column(db.String(32), nullable=False)

class Message(db.Model):
    messageID = db.Column(db.Integer(), primary_key=True, unique=True, nullable=False)
    messageText = db.Column(db.String(250))
    senderID = db.Column(db.String(32), db.ForeignKey('account.username'), nullable=False)
    receiverID = db.Column(db.String(32), db.ForeignKey('account.username'), nullable=False)
    date = db.Column(db.DateTime())

class Note(db.Model):
    noteID = db.Column(db.Integer(), primary_key=True, unique=True, nullable=False)
    incidentID = db.Column(db.Integer(), db.ForeignKey('incident.incidentID'), nullable=False)
    author = db.Column(db.String(32), db.ForeignKey('account.username'), nullable=False)
    text = db.Column(db.String(250))
    date = db.Column(db.DateTime())

class IncidentRequestPriority(db.Model):
    requestID = db.Column(db.Integer(), primary_key=True, unique=True, nullable=False)
    incidentID = db.Column(db.Integer(), db.ForeignKey('incident.incidentID'), nullable=False)
    username = db.Column(db.String(32), db.ForeignKey('account.username'))
    priority = db.Column(db.String(2), nullable=False)
    severity = db.Column(db.String(2), nullable=False)
    impact = db.Column(db.String(2), nullable=False)
    reason = db.Column(db.String(250))
    timeRequested = db.Column(db.DateTime())