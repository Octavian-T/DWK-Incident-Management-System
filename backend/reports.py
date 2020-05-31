from flask import Blueprint, render_template, abort, make_response, request, send_file, jsonify
#from server import *
import Database
from collections import Counter
from io import StringIO
import csv


reports = Blueprint('reports', __name__)


# region Testing
@reports.route("/api/reports/")
def default():
    return send_file("reportTest.html")
# endregion End Testing

# region Routes


@reports.route("/api/reports/total", methods=["GET"])
def total():
    """This method returns the total number of raised incidents for each priority level.

    The request must specify an accepted mimetype, either application/json or text/csv

    Returns:
        flask.response -- http response
    """

    query = Database.Incident.query.with_entities(
        Database.Incident.priority).all()
    # Withcraft to fix 'sqlalchemy.util._collections.result'
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
# endregion

# region utility methods


def create_response(data: dict):
    """Generates a response based off the request.

    Sends either JSON or CSV, based off the request's accept header.
    If no acceptable mimetype is specified, will create a 406 response.

    Arguments:
        data {dict} -- data to send back, either as is or as a CSV if specified in request

    Returns:
        flask.wrappers.Response -- response with data as JSON or CSV, and HTTP status code
    """
    response = make_response("Unknown error", 400)
    if request.accept_mimetypes.accept_json:
        response.headers['Content-Type'] = 'application/json'
        response = make_response(data, 200)

    elif "text/csv" in request.accept_mimetypes:
        data = convert_to_csv(data)
        print(type(data))
        response.headers['Content-Type'] = 'text/csv'
        response = make_response(data, 200)

    else:
        response = make_response(
            {"accepted mimetypes": {"json": "application/json", "csv": "text/csv"}}, 406)

    return response


def convert_to_csv(data : dict):
    """Converts data objects to CSV format

    Arguments:
        data {dict} -- data stored in a dictionary under the key 'data'

    Returns:
        str -- formated as a csv
    """
    output = StringIO()
    writer = csv.writer(output, dialect='excel')
    
    #write header
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
