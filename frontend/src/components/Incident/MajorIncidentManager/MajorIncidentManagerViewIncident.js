import React, { useState, useEffect } from 'react';
import { getMajorIncidents, getUsersIncidents, showNotes } from '../IncidentFunctions';

import '../../css/ViewIncident.css';

function MajorIncidentManagerViewIncident(props) {

    const [incidents, setIncidents] = useState({ "data": [] });

    useEffect(() => {
        const fetchIncidents = async () => {
            await getMajorIncidents().then(resp => setIncidents(resp))
        };
        fetchIncidents();
    }, []);

    //Set selected ID on row click
    function onIncidentRowClick(noteID, clickOnShowNotes){
        props.setSelectedIncidentID(noteID);
        if (clickOnShowNotes) showNotes(noteID);
    }
    
    function updateIncidentPriority(event, id){
        for(var i = 0; i < incidents.data.length; i++){
            if(id == incidents.data[i].incidentID){
                incidents.data[i].priority = event.target.value;
                console.log(incidents.data[i]);
                //post new update
            }
        }
    }

    function updateIncidentSeverity(event, id){
        for(var i = 0; i < incidents.data.length; i++){
            if(id == incidents.data[i].incidentID){
                incidents.data[i].severity = event.target.value;
                console.log(incidents.data[i]);
                //post new update
            }
        }
    }

    return (
      <>
        <h2 className="subheading">Major Incidents</h2>

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
                                <td>
                                    <select defaultValue={incident.priority} onChange={(event) => updateIncidentPriority(event, incident.incidentID)}>
                                        <option value="P1">P1</option>
                                        <option value="P2">P2</option>
                                        <option value="P3">P3</option>
                                    </select>
                                </td>
                                <td>
                                <select defaultValue={incident.severity} onChange={(event) => updateIncidentSeverity(event, incident.incidentID)}>
                                        <option value="S1">S1</option>
                                        <option value="S2">S2</option>
                                        <option value="S3">S3</option>
                                    </select>
                                    </td>
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

export default MajorIncidentManagerViewIncident;