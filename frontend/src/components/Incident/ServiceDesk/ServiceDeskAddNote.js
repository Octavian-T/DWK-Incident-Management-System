import React, { useRef } from 'react';

import axios from 'axios';

function ServiceDeskAddNote(props){

    const newNote = useRef(null)

    function postNewNote(event){
        if(props.selectedIncidentID === undefined){
            alert("Please select an incident to add a note to");
            event.preventDefault();
        }
        else if (newNote.current.value.length > 250 || newNote.current.value.length < 1){
            alert("Note must be between 1-250 characters");
            event.preventDefault();
        }
        else {
            axios.post('http://127.0.0.1/api/note/new',  {
                'incidentID': props.selectedIncidentID,
                'author': sessionStorage.getItem('username'),
                'text': newNote.current.value
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
            <h2>Add Note</h2>
            <p>Current selected Incident ID: {props.selectedIncidentID || "none"}</p>
            <form onSubmit={postNewNote}>
                <textarea placeholder="Max 250 characters" ref={newNote}/>
                <button>Submit</button>
            </form>
          </div>
        </>
      );
}

export default ServiceDeskAddNote;