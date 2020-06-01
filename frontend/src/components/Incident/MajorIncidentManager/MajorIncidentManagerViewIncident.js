import React, { useState, useEffect } from 'react';
import { getMajorIncidents, getDepartments, updateIncident, showNotes } from '../IncidentFunctions';

import '../../css/ViewIncident.css';

function MajorIncidentManagerViewIncident(props) {

    const [incidents, setIncidents] = useState({ "data": [] });
    const [departments, setDepartments] = useState({ "data": [] });

    useEffect(() => {
        const fetchData = async () => {
            await getMajorIncidents().then(resp => setIncidents(resp));
            await getDepartments().then(resp => {
                setDepartments(resp);
                // console.log(resp);
            });
        };
        fetchData();
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
                updateIncident(incidents.data[i]);
            }
        }
    }

    function updateIncidentSeverity(event, id){
        for(var i = 0; i < incidents.data.length; i++){
            if(id == incidents.data[i].incidentID){
                incidents.data[i].severity = event.target.value;
                console.log(incidents.data[i]);
                updateIncident(incidents.data[i]);
            }
        }
    }

    function updateIncidentInvestigatingDept(event, id){
        for(var i = 0; i < incidents.data.length; i++){
            if(id == incidents.data[i].incidentID){
                incidents.data[i].investigatingDepartmentID = event.target.value;
                console.log(incidents.data[i]);
                updateIncident(incidents.data[i]);
            }
        }
    }

    // function updateIncidentInvestigatingDept(event, id){
    //     incidents.data.forEach(element => {
    //         console.log(element);
    //     });
    // }

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
                                <td>
                                    <select value={incident.investigatingDepartmentID} onChange={(event) => updateIncidentInvestigatingDept(event, incident.incidentID)}>
                                        {
                                            departments.data.map(department => (
                                                // console.log(typeof(department.departmentID))
                                                <option key={department.departmentID} value={department.departmentID}>{`${department.departmentID} - ${department.name}`}</option>
                                            ))
                                        }
                                    </select>
                                </td>
                                <td><p className="clickable" onClick={() => onIncidentRowClick(incident.incidentID, true)}>Notes</p></td>
                                <td>
                                    <select value={incident.priority} onChange={(event) => updateIncidentPriority(event, incident.incidentID)}>
                                        <option value="P1">P1</option>
                                        <option value="P2">P2</option>
                                        <option value="P3">P3</option>
                                    </select>
                                </td>
                                <td>
                                    <select value={incident.severity} onChange={(event) => updateIncidentSeverity(event, incident.incidentID)}>
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