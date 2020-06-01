import React, { useEffect, useRef, useState} from 'react';

import axios from 'axios';

import '../../css/ReportIncident.css'

function ServiceDeskReportIncident() {
    const affectedID = useRef(null);
    const department = useRef(null);
    const description = useRef(null);
    
    const [priority, setPriority] = useState("P1")

    useEffect(() => {
        //Set date to today
        document.getElementById('dateInput').value = (new Date()).toISOString().substr(0,10);

        //Set time to current
        var date = new Date();
        var currentTime = date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
        document.getElementById('timeInput').value = currentTime;

        //Set affectedID to service desk user ID, able to change to another user
        affectedID.current.value = sessionStorage.getItem('username');

        department.current.value = 1;
    }, []);
    

    function postNewServiceDeskIncident(event) {
        event.preventDefault();

        if(description.current.value.length > 200){
            alert("More than 200 characters");
            return false;
        }

        axios.post('http://127.0.0.1/api/incident/new',  {
            'raisedID': sessionStorage.getItem('username'),
            'affectedID': affectedID.current.value,
            'investigatingDepartmentID': department.current.value || 1,
            'description': description.current.value,
            'priority': priority,
            'severity': 'S1',
            'impact': 'IMP3',
            'status': 'assigned'
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
            <form onSubmit={postNewServiceDeskIncident}>
                <label>Date</label>
                <input type="date" placeholder="Date" id="dateInput"></input>
                <br />

                <label>Time</label>
                <input type="time" placeholder="Time" id="timeInput"></input>
                <br />

                <label>Unit</label>
                <input type="text" placeholder="Unit"></input>
                <br />

                <label>Affected username:</label>
                <input type="text" placeholder="Affected user:" ref={affectedID}></input>
                <br />

                <label>Department</label>
                <input type="text" placeholder="Department" ref={department}></input>
                <br />

                <label>Incident Description</label>
                <br />
                <textarea placeholder="Max 200 characters" ref={description}></textarea>
                <br />

                <div className="incidentMeasurementSelect">
                    <label htmlFor="prioritySelect">Priority</label>
                    <select id="prioritySelect" defaultValue={priority} onChange={event => setPriority(event.target.value)}> 
                        <option value="P1">P1</option>
                        <option value="P2">P2</option>
                        <option value="P3">P3</option>
                    </select>
                </div>

                <button>Submit</button>
            </form>
          </div>
        </>
    );
}

export default ServiceDeskReportIncident;