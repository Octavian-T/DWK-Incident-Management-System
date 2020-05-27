from flask_sqlalchemy import SQLAlchemy

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
    description = db.Column(db.String(250))
    timeRaised = db.Column(db.DateTime())
    priority = db.Column(db.String(2), nullable=False)
    severity = db.Column(db.String(2), nullable=False)
    impact = db.Column(db.String(2), nullable=False)
    status = db.Column(db.String(32), nullable=False)
    timeCompleted = db.Column(db.DateTime())

class IncidentUpdate(db.Model):
    updateID = db.Column(db.Integer(), primary_key=True, unique=True, nullable=False)
    technicianID = db.Column(db.String(32), db.ForeignKey('account.username'))
    incidentID = db.Column(db.Integer(), db.ForeignKey('incident.incidentID'))
    date = db.Column(db.DateTime())
    description = db.Column(db.String(250))