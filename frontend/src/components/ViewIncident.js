import React, { useState } from 'react';

import './css/ViewIncident.css';

function ViewIncident() {

    const [incidents, setIncidents] = useState({
        "data": [
            {
                "incidentID": 1,
                "raisedID": "directory",
                "affectedID": "user",
                "investigatingDepartmentID": "8",
                "description": "this test is now evolving",
                "timeRaised": "Fri, 15 Feb 2019 07:05:00 GMT",
                "priority": "max",
                "severity": "max",
                "impact": "max",
                "status": "not finished",
                "timeCompleted": "Mon, 30 Dec 2019 12:25:00 GMT"
            },
            {
                "incidentID": 2,
                "raisedID": "user",
                "affectedID": "user",
                "investigatingDepartmentID": "8",
                "description": "this test is now evolving",
                "timeRaised": "Wed, 20 Feb 2019 09:50:00 GMT",
                "priority": "max",
                "severity": "max",
                "impact": "max",
                "status": "not finished",
                "timeCompleted": "Mon, 30 Dec 2019 12:25:00 GMT"
            },
            {
                "incidentID": 3,
                "raisedID": "prince",
                "affectedID": "user2",
                "investigatingDepartmentID": "8",
                "description": "this test is now evolving",
                "timeRaised": "Mon, 04 Mar 2019 10:45:00 GMT",
                "priority": "max",
                "severity": "max",
                "impact": "max",
                "status": "not finished",
                "timeCompleted": "Mon, 30 Dec 2019 12:25:00 GMT"
            },
            {
                "incidentID": 4,
                "raisedID": "directory",
                "affectedID": "user3",
                "investigatingDepartmentID": "8",
                "description": "this test is now evolving",
                "timeRaised": "Sat, 30 Mar 2019 13:50:00 GMT",
                "priority": "max",
                "severity": "max",
                "impact": "max",
                "status": "not finished",
                "timeCompleted": "Mon, 30 Dec 2019 12:25:00 GMT"
            },
            {
                "incidentID": 5,
                "raisedID": "prince",
                "affectedID": "user2",
                "investigatingDepartmentID": "8",
                "description": "this test is now evolving",
                "timeRaised": "Mon, 15 Apr 2019 16:25:00 GMT",
                "priority": "max",
                "severity": "max",
                "impact": "max",
                "status": "not finished",
                "timeCompleted": "Mon, 30 Dec 2019 12:25:00 GMT"
            },
            {
                "incidentID": 6,
                "raisedID": "prince",
                "affectedID": "user",
                "investigatingDepartmentID": "8",
                "description": "this test is now evolving",
                "timeRaised": "Tue, 16 Apr 2019 07:05:00 GMT",
                "priority": "max",
                "severity": "max",
                "impact": "max",
                "status": "not finished",
                "timeCompleted": "Mon, 30 Dec 2019 12:25:00 GMT"
            },
            {
                "incidentID": 7,
                "raisedID": "autonomy",
                "affectedID": "autonomy",
                "investigatingDepartmentID": "8",
                "description": "this test is now evolving",
                "timeRaised": "Sat, 18 May 2019 10:30:00 GMT",
                "priority": "max",
                "severity": "max",
                "impact": "max",
                "status": "not finished",
                "timeCompleted": "Mon, 30 Dec 2019 12:25:00 GMT"
            },
            {
                "incidentID": 8,
                "raisedID": "mud",
                "affectedID": "mud",
                "investigatingDepartmentID": "8",
                "description": "this test is now evolving",
                "timeRaised": "Thu, 06 Jun 2019 06:36:00 GMT",
                "priority": "max",
                "severity": "max",
                "impact": "max",
                "status": "not finished",
                "timeCompleted": "Mon, 30 Dec 2019 12:25:00 GMT"
            },
            {
                "incidentID": 9,
                "raisedID": "pour",
                "affectedID": "pour",
                "investigatingDepartmentID": "8",
                "description": "this test is now evolving",
                "timeRaised": "Sat, 20 Jul 2019 06:04:00 GMT",
                "priority": "max",
                "severity": "max",
                "impact": "max",
                "status": "not finished",
                "timeCompleted": "Mon, 30 Dec 2019 12:25:00 GMT"
            },
            {
                "incidentID": 10,
                "raisedID": "tent",
                "affectedID": "tent",
                "investigatingDepartmentID": "8",
                "description": "this test is now evolving",
                "timeRaised": "Mon, 02 Sep 2019 07:50:00 GMT",
                "priority": "max",
                "severity": "max",
                "impact": "max",
                "status": "not finished",
                "timeCompleted": "Mon, 30 Dec 2019 12:25:00 GMT"
            },
            {
                "incidentID": 11,
                "raisedID": "user",
                "affectedID": "user",
                "investigatingDepartmentID": "8",
                "description": "this test is now evolving",
                "timeRaised": "Wed, 25 Dec 2019 23:45:00 GMT",
                "priority": "max",
                "severity": "max",
                "impact": "max",
                "status": "not finished",
                "timeCompleted": "Mon, 30 Dec 2019 12:25:00 GMT"
            },
            {
                "incidentID": 12,
                "raisedID": "prince",
                "affectedID": "user3",
                "investigatingDepartmentID": "8",
                "description": "this test is now evolving",
                "timeRaised": "Wed, 25 Dec 2019 23:45:00 GMT",
                "priority": "max",
                "severity": "max",
                "impact": "max",
                "status": "not finished",
                "timeCompleted": "Mon, 30 Dec 2019 12:25:00 GMT"
            }
        ]
        });

    return (
      <div className="col-md-8">
        <h2 className="subheading">View Incident</h2>

        <div className="background-container">
            <select>
                <option>1</option>
                <option>2</option>
                <option>3</option>
            </select>

            <button>Submit</button>
            <br />

            <select>
                <option>1</option>
                <option>2</option>
                <option>3</option>
            </select>

            <button>Submit</button>
            <br />

            <table className="incident-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Location</th>
                        <th>Description</th>
                        <th>Team</th>
                        <th>Notes</th>
                        <th>Priority</th>
                        <th>Severity</th>
                        <th>Impact</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        incidents.data.map(incident => (
                            <tr key={incident.incidentID}>
                                <td>{incident.incidentID}</td>
                                <td>Location</td>
                                <td>{incident.description}</td>
                                <td>{incident.investigatingDepartmentID}</td>
                                <td>Notes</td>
                                <td>{incident.priority}</td>
                                <td>{incident.severity}</td>
                                <td>{incident.impact}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
      </div>
    );
}

export default ViewIncident;