import React, {useRef} from 'react';

import axios from 'axios';

import '../../css/ReportIncident.css'

function TechnicianReportIncident() {
    const description = useRef(null);
    const date = useRef(null);
    const time = useRef(null);

    function postIncident(event) {
        event.preventDefault();
        axios.post('http://127.0.0.1/api/incident/new',  {
            'raisedID':sessionStorage.getItem('username'),
            'affectedID':sessionStorage.getItem('username'),
            'description': description.current.value,
            'date':date + ' ' + time,
            'investigatingDepartmentID':0
        }, {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('access_token'),
                'Access-Control-Allow-Origin': '*'
            }
        })
        .then(res => {
            //Successfully submitted new incident, refresh page to show in table
            if(res.status === 200){
                window.location.replace("/incidents")
            }
        })
        .catch(error => {
            alert(error.response);
        })
    }

    return (
        <>
          <h2 className="subheading">Report Incident</h2>
          <div className="background-container">
            <form >
                <input type="date" placeholder="Date" id="dateInput" ref={date}></input>
                <br />
                <input type="time" placeholder="Time" id="timeInput" ref={time}></input>
                <br />

                <label>Incident Description</label>
                <br />
                <textarea ref={description}></textarea>
                <br />

                <button onClick={postIncident}>Submit</button>
            </form>
          </div>
        </>
    );
}

export default TechnicianReportIncident;