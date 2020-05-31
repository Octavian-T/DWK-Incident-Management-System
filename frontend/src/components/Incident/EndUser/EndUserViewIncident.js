import React, { useState, useEffect } from 'react';
import { getUsersIncidents, showNotes } from '../IncidentFunctions';

import '../../css/ViewIncident.css';

function EndUserViewIncident(props) {

    const [incidents, setIncidents] = useState({ "data": [] });

    useEffect(() => {
        const fetchIncidents = async () => {
            await getUsersIncidents(sessionStorage.getItem('username')).then(resp => setIncidents(resp))
        };
        fetchIncidents();
    }, []);

    //Set selected ID on row click
    function onIncidentRowClick(noteAuthorID, clickOnShowNotes){
        incidents.data.forEach(incident => {
            if(incident.incidentID === noteAuthorID){
                props.setSelectedIncident(incident);
                if (clickOnShowNotes) showNotes(noteAuthorID);
            }
        });
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