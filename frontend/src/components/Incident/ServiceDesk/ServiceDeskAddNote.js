import React, { useRef } from 'react';

import { postNewNote } from '../IncidentFunctions';

function ServiceDeskAddNote(props){

    const newNote = useRef(null)

    function handleNewNote(event){
        if(props.selectedIncidentID === undefined){
            alert("Please select an incident to add a note to");
            event.preventDefault();
        }
        else if (newNote.current.value.length > 250 || newNote.current.value.length < 1){
            alert("Note must be between 1-250 characters");
            event.preventDefault();
        }
        else {
            postNewNote(props.selectedIncidentID, sessionStorage.getItem('username'), newNote.current.value);
        }
    }
    
    return (
        <>
          <div className="background-container">
            <h2>Add Note</h2>
            <p>Current selected Incident ID: {props.selectedIncidentID || "none"}</p>
            <form onSubmit={handleNewNote}>
                <textarea placeholder="Max 250 characters" ref={newNote}/>
                <button>Submit</button>
            </form>
          </div>
        </>
      );
}

export default ServiceDeskAddNote;