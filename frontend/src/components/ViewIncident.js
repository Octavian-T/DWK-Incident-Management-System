import React, { useState, useEffect } from 'react';

import axios from 'axios';

import './css/ViewIncident.css';

function ViewIncident() {

    const [incidents, setIncidents] = useState({ "data": [] });

    useEffect(() => {
        axios.get('http://127.0.0.1/api/incident/all', {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('access_token'),
                'Access-Control-Allow-Origin': '*'
            }
        })
        .then((res) => {
            console.log(res);
            setIncidents(res.data);
        })
        .catch(error => {
            if(error.response.status === 422){
                alert("Error " + error.response.status + " - Not logged in");
                window.location.replace("/");
            }
        })
    }, []);
    
    console.log(incidents);

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