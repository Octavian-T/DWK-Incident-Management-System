import React, { useState, useEffect } from 'react';

import axios from 'axios';

import '../../css/ViewIncident.css';

function QueueManagerViewIncident(props) {

    const [incidents, setIncidents] = useState({ "data": [] });

    useEffect(() => {
            if (props.state === 'report'){
                axios.get('http://127.0.0.1/api/incident/all', {
                    headers: {
                        'Authorization': 'Bearer ' + sessionStorage.getItem('access_token'),
                        'Access-Control-Allow-Origin': '*'
                    }
                })
                .then(res => {
                    setIncidents(res.data);
                })
                .catch(error => {
                    if(error.response.status === 422){
                        alert("Error " + error.response.status + " - Not logged in");
                        window.location.replace("/");
                    }
                });
            }else if (props.state === 'update') {
                axios.get('http://127.0.0.1/api/department/'+sessionStorage.getItem('departmentID')+'/incidents', {
                    headers: {
                        'Authorization': 'Bearer ' + sessionStorage.getItem('access_token'),
                        'Access-Control-Allow-Origin': '*'
                    }
                })
                .then(res => {
                    setIncidents(res.data);
                })
                .catch(error => {
                    if(error.response.status === 422){
                        alert("Error " + error.response.status + " - Not logged in");
                        window.location.replace("/");
                    }
                });
            }
    }, [props.state]);

    //Set selected ID on row click
    function onIncidentRowClick(noteID){
        props.setSelectedIncidentID(noteID);
    }

    return (
      <>
        <h2 className="subheading">View Incident</h2>

        <div className="background-container">
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
                            <tr key={incident.incidentID} onClick={() => onIncidentRowClick(incident.incidentID)}>
                                <td>{incident.incidentID}</td>
                                <td>Location</td>
                                <td>{incident.description}</td>
                                <td>{incident.investigatingDepartmentID}</td>
                                <td><p className="clickable" onClick={() => onIncidentRowClick(incident.incidentID)}>Notes</p></td>
                                <td>{incident.priority}</td>
                                <td>{incident.severity}</td>
                                <td>{incident.impact}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
      </>
    );
}

export default QueueManagerViewIncident;