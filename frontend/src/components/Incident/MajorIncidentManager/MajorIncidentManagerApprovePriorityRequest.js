import React, { useState, useEffect } from 'react';

import { getIncidentPriorityRequests, approveIncidentPriorityRequest } from '../IncidentFunctions';

function MajorIncidentManagerApprovePriorityRequest(){

    const [incidentRequests, setIncidentRequests] = useState({ 'data': [] });

    useEffect(() => {
        const fetchIncidentPriorityRequests = async () => {
            await getIncidentPriorityRequests()
            .then(resp => {
                setIncidentRequests(resp);
                console.log(resp);
            })
        };
        fetchIncidentPriorityRequests();
    }, []);

    return (
      <>
        <h2 className="subheading">Priority Requests</h2>
        
        <div className="background-container">

            <table className="incident-table">
                <thead>
                    <tr>
                        <th>IncidentID</th>
                        <th>Username</th>
                        <th>New Priority</th>
                        <th>New Severity</th>
                        <th>New Impact</th>
                        <th>Reason</th>
                        <th>Accept</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        incidentRequests.data.map(incidentRequest => (
                            <tr key={incidentRequest.incidentID}>
                                <td>{incidentRequest.incidentID}</td>
                                <td>{incidentRequest.username}</td>
                                <td>{incidentRequest.priority}</td>
                                <td>{incidentRequest.severity}</td>
                                <td>{incidentRequest.impact}</td>
                                <td>{incidentRequest.reason}</td>
                                <td>
                                    <select onChange={() => approveIncidentPriorityRequest(incidentRequest.requestID, incidentRequest.priority, incidentRequest.severity, incidentRequest.impact)}>
                                        <option value="No">No</option>
                                        <option value="Yes">Yes</option>
                                    </select>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            
        </div>
      </>
    );

}

export default MajorIncidentManagerApprovePriorityRequest;