import React, { useRef } from 'react';

import axios from 'axios';

function TechnicianUpdateProgress(props){

    const progressText = useRef(null)
    const minutes = useRef(null);
    const status = useRef(null);

    function postNewProgressUpdate(event){
        if(props.selectedIncidentID === undefined){
            alert("Please select an incident to add a note to");
            event.preventDefault();
        }
        else if (progressText.current.value.length > 250 || progressText.current.value.length < 1){
            alert("Note must be between 1-250 characters");
            event.preventDefault();
        }
        else {
            console.log({
                'incidentID': props.selectedIncidentID,
                'technicianID': sessionStorage.getItem('username'),
                'description': progressText.current.value,
                'updateType': status.current.value,
                'timeSpent': minutes.current.value
            });
            console.log(`http://127.0.0.1/api/incident/${props.selectedIncidentID}/updates`);
            axios.post(`http://127.0.0.1/api/incident/${props.selectedIncidentID}/updates`,  {
                'incidentID': props.selectedIncidentID,
                'technicianID': sessionStorage.getItem('username'),
                'description': progressText.current.value,
                'updateType': status.current.value,
                'timeSpent': minutes.current.value
            }, {
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('access_token'),
                    'Access-Control-Allow-Origin': '*'
                }
            })
            .then(res => {
                //Successfully submitted new note, refresh page to show in table
                if(res.status === 200){
                    window.location.replace("/incidents")
                }
            })
            .catch(error => {
                alert(error.response);
            })
        }
    }
    
    return (
        <>
          <div className="background-container">
            <h2>Update Progress</h2>
            <p>Current selected Incident ID: {props.selectedIncidentID || "none"}</p>
            <form onSubmit={postNewProgressUpdate}>
                <textarea placeholder="Max 250 characters" ref={progressText}/>
                <select ref={status}>
                    <option value="update">Update</option>
                    <option value="workaround">Work Around</option>
                    <option value="Completed">Completed</option>
                </select>
                <input type="text" placeholder="Time taken (min)" ref={minutes}></input>
                <button>Submit</button>
            </form>
          </div>
        </>
      );
}

export default TechnicianUpdateProgress;