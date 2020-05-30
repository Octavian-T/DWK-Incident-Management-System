import React, { useEffect, useRef} from 'react';

import axios from 'axios';

import '../../css/ReportIncident.css'

function TechnicianReportIncident() {
    const affectedID = useRef(null);
    const investigatingDepartmentID = useRef(null);
    const description = useRef(null);
    const closeIncident = useRef(null);
    const investigatingUnitID = useRef(null);
    const technicianID = useRef(null);
    const date = useRef(null);
    const time = useRef(null);

    useEffect(() => {
        //Set date to today
        document.getElementById('dateInput').value = (new Date()).toISOString().substr(0,10);

        var date = new Date();
        var currentTime = date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
        document.getElementById('timeInput').value = currentTime;
    }, []);

    function postIncident(event) {
        event.preventDefault();
        axios.post('http://127.0.0.1/api/incident/new',  {
            'raisedID':sessionStorage.getItem('username'),
            'affectedID':affectedID.current.value,
            'investigatingDepartmentID':investigatingDepartmentID.current.value,
            'description': description.current.value,
            'date':date + ' ' + time,
            'technicianID':technicianID.current.value,
            'investigatingUnitID':investigatingUnitID.current.value,
            'closeIncident':closeIncident.current.value
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

                <label>Affected by</label>
                <br />
                <input type="text" placeholder="Staff Username" ref={affectedID}></input>
                <br />

                <label>Unit</label>
                <br />
                <input type="text" placeholder="Unit" ref={investigatingUnitID}></input>
                <br />

                <label>Department</label>
                <br />
                <input type="text" placeholder="Unit" ref={investigatingDepartmentID}></input>
                <br />

                <label>Incident Description</label>
                <br />
                <textarea ref={description}></textarea>
                <br />

                <label>Assign Technician</label>
                <select ref={technicianID}>
                    <option>Dep 1</option>
                    <option>Dep 2</option>
                    <option>Dep 3</option>
                </select>
                <br />

                <div className="form-check form-check-inline">
                  <label className="form-check-label">
                    Close Incident
                  </label>
                  <input className="form-check-input" type="checkbox" name="closeIncident" ref={closeIncident}></input>
                </div>

                <button onClick={postIncident}>Submit</button>
            </form>
          </div>
        </>
    );
}

export default TechnicianReportIncident;