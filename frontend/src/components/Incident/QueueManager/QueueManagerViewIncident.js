import React, { useState, useEffect } from 'react';

import axios from 'axios';

import '../../css/ViewIncident.css';

function QueueManagerViewIncident(props) {

    const [incidents, setIncidents] = useState({ "data": [] });

    useEffect(() => {
        axios.get('http://127.0.0.1/api/incident/all', {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('access_token'),
                'Access-Control-Allow-Origin': '*'
            }
        })
        .then(res => {
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

    //Set selected ID on row click
    function onIncidentRowClick(noteID){
        axios.get("http://127.0.0.1/api/incident/"+noteID, {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('access_token'),
                'Access-Control-Allow-Origin': '*'
            }
        })
        .then(function(response){
            props.setDate(response.data.timeRaised);
            props.setSelectedIncidentID(noteID);
            props.setPriority(response.data.priority);
            props.setSeverity(response.data.severity);
            props.setPriority(response.data.priority);
            props.setInvestigatingUnitID(response.data.investigatingUnitID);
            props.setInvestigatingDepartmentID(response.data.investigatingDepartmentID);
        })
        .catch(function(error){
            console.log(error);
        });
    }

    return (
      <>
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
                            <tr key={incident.incidentID} onClick={() => onIncidentRowClick(incident.incidentID, false)}>
                                <td>{incident.incidentID}</td>
                                <td>Location</td>
                                <td>{incident.description}</td>
                                <td>{incident.investigatingDepartmentID}</td>
                                <td><p className="clickable" onClick={() => onIncidentRowClick(incident.incidentID, true)}>Notes</p></td>
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