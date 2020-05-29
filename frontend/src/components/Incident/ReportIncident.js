import React, { useEffect, useRef} from 'react';

import axios from 'axios';

import '../css/ReportIncident.css'

function ReportIncident() {
    const affectedID = useRef(null);
    const investigatingDepartmentID = useRef(null);
    const description = useRef(null);
    const timeRaised = useRef(null);
    const priority = useRef(null);
    const severity = useRef(null);
    const impact = useRef(null);

    useEffect(() => {
        //Set date to today
        document.getElementById('dateInput').value = (new Date()).toISOString().substr(0,10);

        var date = new Date();
        var currentTime = date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
        document.getElementById('timeInput').value = currentTime;
    }, []);

    function postIncident(){
        axios({
            method:'post',
            url:'http://127.0.0.1/api/incident/new',
            params: {
                'raisedID':sessionStorage.getItem('username'),
                'affectedID':affectedID,
                'investigatingDepartmentID':investigatingDepartmentID,
                'description': description,
                'timeRaised':timeRaised,
                'priority':priority,
                'severity':severity,
                'impact':impact
            }
        });
    }

    return (
        <div className="col-md-4">
          <h2 className="subheading">Report Incident</h2>

          <div className="background-container">
            <form>
                <input type="date" placeholder="Date" id="dateInput"></input>
                <br />
                <input type="time" placeholder="Time" id="timeInput"></input>
                <br />

                <label>Raised by</label>
                <input type="text" placeholder="Staff Name"></input>
                <br />

                {/* <input type="text" placeholder="IncidentID"></input>
                <br /> */}

                <label>Unit</label>
                <input type="text" placeholder="Unit"></input>
                <br />

                <label>Department</label>
                <input type="text" placeholder="Unit"></input>
                <br />

                <label>Incident Type</label>
                <select disabled>
                    <option selected>1</option>
                    <option>2</option>
                    <option>3</option>
                </select>
                <br />

                <label>Incident Description</label>
                <br />
                <textarea></textarea>
                <br />

                <label>Assign</label>
                <select>
                    <option>Dep 1</option>
                    <option>Dep 2</option>
                    <option>Dep 3</option>
                </select>
                <br />

                <label>Priority</label>
                <select> 
                    <option>P1</option>
                    <option>P2</option>
                    <option>P3</option>
                </select>

                <label>Severity</label>
                <select>
                    <option>S1</option>
                    <option>S2</option>
                    <option>S3</option>
                </select>

                <label>Impact</label>
                <select>
                    <option>IMP1</option>
                    <option>IMP2</option>
                    <option>IMP3</option>
                </select>
                <br />

                <button>Submit</button>
            </form>
          </div>
        </div>
    );
}

export default ReportIncident;