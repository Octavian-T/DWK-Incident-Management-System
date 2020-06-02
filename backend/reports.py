"""
Reporting API

Handles reporting and exporting data
"""
from collections import Counter
from io import StringIO
import csv
import datetime

from flask import Blueprint, render_template, abort, make_response, request, send_file, jsonify

# from server import *
import Database


reports = Blueprint('reports', __name__)
# SLA Targets stored in seconds
SLA_targets = {
    "P1": [7200, 86400],
    "P2": [86400, 259200],
    "P3": [259200, 604800]
}


# region Testing
@reports.route("/api/reports/")
def default():
    return send_file("reportTest.html")
# endregion End Testing

# region Routes


@reports.route("/api/reports/incidents/totals", methods=["GET"])
def incidents_totals():
    """This method returns the total number of raised incidents for each priority level.

    The request must specify an accepted mimetype, either application/json or text/csv

    Request Arguments:
        from -- from date, e.g. 2020-01-20
        to -- to date, e.g. 2020-01-20%2023:59:59

    Returns:
        flask.response -- http response
    """

    if "from" in request.args or "to" in request.args:
        from_date = request.args.get('from', default="2000-01-01")
        to_date = request.args.get('to', default="2999-12-31")
        query = Database.Incident.query.filter(Database.Incident.timeRaised >= from_date,
                                               Database.Incident.timeRaised <= to_date).with_entities(Database.Incident.priority).all()
    else:
        query = Database.Incident.query.with_entities(
            Database.Incident.priority).all()
    # Witchcraft to fix 'sqlalchemy.util._collections.result'
    query = [i for (i, ) in query]
    query = Counter(query)

    incidents = {"data": []}
    for key in query.keys():
        incident = {
            "priority": key,
            "total": query[key]
        }
        incidents["data"].append(incident)
    return create_response(incidents)


@reports.route("/api/reports/incidents/ttr/<id>", methods=["GET"])
def incidents_ttr(id):
    """This method returns a list of incident IDs and the Time-To-Resolve (TTR) in seconds.

    Arguments:
        id -- incidentID, or 'all' to get all incidents
    Request Arguments:
        from -- from date, e.g. 2020-01-20
        to -- to date, e.g. 2020-01-20%2023:59:59

    Returns:
        flask.response -- http response
    """
    incidents = {"data": []}
    from_date = request.args.get('from', default="2000-01-01")
    to_date = request.args.get('to', default="2999-12-31")

    if id == "all":
        query = Database.Incident.query.filter(
            Database.Incident.timeRaised >= from_date, Database.Incident.timeRaised <= to_date).with_entities(
            Database.Incident.incidentID, Database.Incident.timeRaised, Database.Incident.timeCompleted).all()
        for incident in query:
            incident = {
                "incidentID": incident[0],
                "ttr": calc_ttr(incident[1], incident[2])
            }
            incidents["data"].append(incident)
    else:
        query = Database.Incident.query.filter(Database.Incident.incidentID == id).with_entities(
            Database.Incident.incidentID, Database.Incident.timeRaised, Database.Incident.timeCompleted).first()
        incident = {
            "incidentID": query[0],
            "ttr": calc_ttr(query[1], query[2])
        }
        incidents["data"].append(incident)

    return create_response(incidents)


@reports.route("/api/reports/departments/totals/<id>", methods=["GET"])
def departments_totals(id):
    """This method returns the total number of incidents and total TTR for each department.

    Arguments:
        id -- departmentID, or 'all' to get all departments
    Request Arguments:
        from -- from date, e.g. 2020-01-20
        to -- to date, e.g. 2020-01-20%2023:59:59

    Returns:
        flask.response -- http response
    """

    departments = {"data": []}
    from_date = request.args.get('from', default="2000-01-01")
    to_date = request.args.get(
        'to', default="2999-12-31")

    if id == "all":
        query = Database.Department.query.with_entities(
            Database.Department.departmentID).all()
        department_list = [departmentID for departmentID, in query]
    else:
        department_list = [id]

    for departmentID in department_list:
        query = Database.Incident.query.filter(Database.Incident.investigatingDepartmentID == departmentID,
                                               Database.Incident.timeRaised >= from_date,
                                               Database.Incident.timeRaised <= to_date).with_entities(
            Database.Incident.incidentID, Database.Incident.investigatingDepartmentID, Database.Incident.timeRaised, Database.Incident.timeCompleted).all()
        department = {
            "departmentID": departmentID,
            "total_incidents": 0,
            "total_ttr": 0
        }
        for incident in query:
            ttr = calc_ttr(incident[2], incident[3])
            ttr = ttr if ttr != -1 else 0
            department["total_incidents"] += 1
            department["total_ttr"] += ttr
        departments["data"].append(department)

    return create_response(departments)


@reports.route("/api/reports/technicians/totals/<id>", methods=["GET"])
def technicians_totals(id):
    """This method returns the total amount of incidents and time spent for a technician.

    Arguments:
        id  -- technicianID, or 'all' to get all technicians
    Request Arguments:
        from -- from date, e.g. 2020-01-20
        to -- to date, e.g. 2020-01-20%2023:59:59

    Returns:
        flask.response -- http response
    """
    technicians = {"data": []}
    from_date = request.args.get('from', default="2000-01-01")
    to_date = request.args.get(
        'to', default="2999-12-31")

    incident_team = ["Technician", "Que Manager",
                     "Major Incident Manager", "Resolver"]

    if id == "all":
        query = Database.DepartmentMember.query.filter(Database.DepartmentMember.role.in_(incident_team)).with_entities(
            Database.DepartmentMember.username).all()
        technicians_list = [username for username, in query]
    else:
        technicians_list = [id]

    for username in technicians_list:
        query = Database.Incident.query.filter(Database.IncidentUpdate.technicianID == username,
                                               Database.IncidentUpdate.date >= from_date,
                                               Database.IncidentUpdate.date <= to_date).with_entities(
            Database.IncidentUpdate.technicianID, Database.IncidentUpdate.timeSpent).all()
        technician = {
            "technicianID": username,
            "total_incidents": 0,
            "total_time_spent": 0
        }
        incidents = []
        for incidentUpdate in query:
            technician["total_incidents"] += 1 if incidentUpdate[0] in incidents else 0
            technician["total_time_spent"] += incidentUpdate[1]
            incidents.append(incidentUpdate[0])
        technicians["data"].append(technician)
    return create_response(technicians)


@reports.route("/api/reports/sla/status/<id>", methods=["GET"])
def get_SLA_status(id):
    incidents = {"data": []}
    from_date = request.args.get('from', default="2000-01-01")
    to_date = request.args.get('to', default="2999-12-31")

    if id == "all":
        query = Database.Incident.query.filter(
            Database.Incident.timeRaised >= from_date,
            Database.Incident.timeRaised <= to_date).with_entities(
            Database.Incident.incidentID, Database.Incident.priority,
            Database.Incident.status, Database.Incident.timeRaised).all()
        incidents_list = query
    else:
        query = Database.Incident.query.filter(
            Database.Incident.incidentID == id).with_entities(
            Database.Incident.incidentID, Database.Incident.priority,
            Database.Incident.status, Database.Incident.timeRaised).all()
        incidents_list = query

    for username in incidents_list:
        query = Database.IncidentUpdate.query.filter(Database.IncidentUpdate.technicianID == username,
                                               Database.IncidentUpdate.date >= from_date,
                                               Database.IncidentUpdate.date <= to_date).with_entities(
            Database.IncidentUpdate.technicianID, Database.IncidentUpdate.timeSpent).all()
        technician = {
            "technicianID": username,
            "total_incidents": 0,
            "total_time_spent": 0
        }
        for incident in query:
            technician["total_incidents"] += 1
            technician["total_time_spent"] += incident[1]
        incidents["data"].append(technician)
    return create_response(incidents)


@reports.route("/api/reports/incidents/single/<id>", methods=["GET"])
def incidents_single(id):
    return "Foo"

# endregion
# region utility methods


def calc_ttr(timeRaised, timeCompleted):
    """Calculates the Time To Resolve (TTR)

    Arguments:
        timeRaised {datetime}-- start date
        timeCompleted {datetime} -- end date

    Returns:
        int -- TTR in seconds
    """
    if timeCompleted == None:
        ttr = -1
    else:
        ttr = datetime.timedelta.total_seconds(timeCompleted - timeRaised)
    return ttr


def create_response(data: dict):
    """Generates a response based off the request.

    Sends either JSON or CSV, based off the request's accept header.
    If no acceptable mimetype is specified, will create a 406 response.

    Arguments:
        data {dict} -- data to send back, either as is or as a CSV if specified in request

    Returns:
        flask.wrappers.Response -- response with data as JSON or CSV, and HTTP status code
    """
    if request.accept_mimetypes.accept_json:
        response = make_response(data, 200)
        response.headers['Content-Type'] = 'application/json'

    elif "text/csv" in request.accept_mimetypes:
        data = convert_to_csv(data)
        response = make_response(data, 200)
        response.headers['Content-Type'] = 'text/csv'

    else:
        response = make_response(
            {"accepted mimetypes": {"json": "application/json", "csv": "text/csv"}}, 406)

    return response


def convert_to_csv(data: dict):
    """Converts data objects to CSV format

    Arguments:
        data {dict} -- data stored in a dictionary under the key 'data'

    Returns:
        str -- formated as a csv
    """
    output = StringIO()
    writer = csv.writer(output, dialect='excel')

    # write header
    writer.writerow(data["data"][0].keys())
    # Make data into CSV
    for row in data["data"]:
        writer.writerow(row.values())
    return output.getvalue()


def sort_dict(unsorted_dict: dict):
    """Sorts dictionary alphabetically via key

    Arguments:
        unsorted_dict {dict} -- an unsorted dictionary of key:value pairs

    Returns:
        {dict} -- sorted dictionary
    """
    sorted_dict = {}
    for key in sorted(unsorted_dict.keys()):
        sorted_dict[key] = unsorted_dict[key]
    return sorted_dict
# endregion
