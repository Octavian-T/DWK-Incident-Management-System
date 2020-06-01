import React, { useState, useEffect, useRef } from 'react';
import { getUsersIncidents, showNotes } from '../IncidentFunctions';
import '../../css/ViewIncident.css';

function ServiceDeskViewIncident(props) {

    const [incidents, setIncidents] = useState({ 'data': [] });
    
    const searchUserIncidents = useRef(null);
    
    useEffect(() => {
        const fetchIncidents = async () => {
            await getUsersIncidents(sessionStorage.getItem('username'))
            .then(resp => {
                setIncidents(resp);
                console.log(resp);
            })
        };
        fetchIncidents();
    }, []);
    
    //Set selected ID on row click
    function onIncidentRowClick(noteID, clickOnShowNotes){
        props.setSelectedIncidentID(noteID);
        if (clickOnShowNotes) showNotes(noteID);
    }
    
    //Handles the submit button when they search for a user
    function handleSearchUserIncidents(event){
        event.preventDefault();
        getUsersIncidents(searchUserIncidents.current.value).then(resp => setIncidents(resp));
    }
    
    return (
      <>
        <h2 className="subheading">My Incidents</h2>

        <div className="background-container">

            <form onSubmit={handleSearchUserIncidents}>
                <input type="text" placeholder="Enter username to find incidents" ref={searchUserIncidents}></input>
                <button>Submit</button>
            </form>

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
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                       incidents && incidents.data && incidents.data.map(incident => (
                            <tr key={incident.incidentID} onClick={() => onIncidentRowClick(incident.incidentID, false)}>
                                <td>{incident.incidentID}</td>
                                <td>Location</td>
                                <td>{incident.description}</td>
                                <td>{incident.investigatingDepartmentID}</td>
                                <td><p className="clickable" onClick={() => onIncidentRowClick(incident.incidentID, true)}>Notes</p></td>
                                <td>{incident.priority}</td>
                                <td>{incident.severity}</td>
                                <td>{incident.impact}</td>
                                <td>{incident.status}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

        </div>
      </>
    );
}

export default ServiceDeskViewIncident;