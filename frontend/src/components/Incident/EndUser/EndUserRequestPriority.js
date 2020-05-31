import React, { useState, useEffect } from 'react';

import { postIncidentRequestPriority } from '../IncidentFunctions';

function EndUserRequestPriority(props){

    const [priority, setPriority] = useState("P1");
    const [severity, setSeverity] = useState("S1");
    const [impact, setImpact] = useState("IMP1");
    
    
    function handleNewPriorityRequest(e) {
      if (props.selectedIncident.incidentID === undefined) {
        alert("Please select a incident to request priority")
        e.preventDefault();
      }
      
      else if(priority === props.selectedIncident.priority 
        && severity === props.selectedIncident.severity 
        && impact === props.selectedIncident.impact) {
          alert("Please change the options");
          e.preventDefault();
      }
      else {
        postIncidentRequestPriority(props.selectedIncident.incidentID, sessionStorage.getItem('username'), priority, severity, impact);
      }
    }

    useEffect(() => {
      setPriority(props.selectedIncident.priority);
      setSeverity(props.selectedIncident.severity);
      setImpact(props.selectedIncident.impact);
    }, [props.selectedIncident])

    return (
        <>
          <div className="background-container">
            <h2>Request Priority</h2>
            <p>Current selected Incident ID: {props.selectedIncident.incidentID || "none"}</p>
            <form onSubmit={event => handleNewPriorityRequest(event)}>
                <select value={priority} onChange={event => setPriority(event.target.value)} style={{width: "20%"}}>
                  <option value="P1">P1</option>
                  <option value="P2">P2</option>
                  <option value="P3">P3</option>
                </select>
                <select value={severity} onChange={event => setSeverity(event.target.value)} style={{width: "20%"}}>
                  <option value="S1">S1</option>
                  <option value="S2">S2</option>
                  <option value="S3">S3</option>
                </select>
                <select value={impact} onChange={event => setImpact(event.target.value)} style={{width: "20%"}}>
                    <option value="IMP1">IMP1</option>
                    <option value="IMP2">IMP2</option>
                    <option value="IMP3">IMP3</option>
                </select>
                <button>Request</button>
            </form>
          </div>
        </>
      );
}

export default EndUserRequestPriority;