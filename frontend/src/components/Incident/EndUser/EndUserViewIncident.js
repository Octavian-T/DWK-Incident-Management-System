import React, { useState, useEffect } from 'react';

import axios from 'axios';

import '../../css/ViewIncident.css';

function EndUserViewIncident(props) {

    const [incidents, setIncidents] = useState({ "data": [] });

    useEffect(() => {
        axios.get(`http://127.0.0.1/api/account/${sessionStorage.getItem('username')}/incidents`, {
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
            else {
                alert(error);
            }
        })
    }, []);

    //Set selected ID on row click
    function onIncidentRowClick(noteID, clickOnShowNotes){
        props.setSelectedIncidentID(noteID);
        if (clickOnShowNotes) showNotes(noteID);
    }

    function showNotes(noteID){
        console.log(`Showing notes for: ${noteID}`)
        axios.get(`http://127.0.0.1/api/incident/${noteID}/notes`, {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('access_token'),
                'Access-Control-Allow-Origin': '*'
            }
        })
        .then(res => {
            var notes = res.data.data;
            if(notes.length === 0){
                alert("No notes for this incident");
            }
            else {
                var notesLog = "";

                for(var i = 0; i < notes.length; i++){
                    notesLog += `[${notes[i].author}]: ${notes[i].text} (${notes[i].date})\n`;
                }

                alert(notesLog);
            }
        })
        .catch(error => console.log(error))
    }

    return (
      <>
        <h2 className="subheading">My Incidents</h2>

        <div className="background-container">

            <div style={{float: "left", textAlign: "left", lineHeight: "100%"}}>
                <p>{sessionStorage.getItem('first_name')}</p>
                <p>{sessionStorage.getItem('first_name')}</p>
                <p>{sessionStorage.getItem('department')}</p>
            </div>

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

export default EndUserViewIncident;