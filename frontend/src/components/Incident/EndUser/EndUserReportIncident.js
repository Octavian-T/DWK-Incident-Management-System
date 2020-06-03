import React, { useState, useEffect, useRef} from 'react';

import axios from 'axios';

import { getDepartments } from '../IncidentFunctions';

import '../../css/ReportIncident.css'

function EndUserReportIncident() {
    const description = useRef(null);
    const departmentSelect = useRef(null);

    const [departments, setDepartments] = useState({ "data": [] });
    // const affectedID = useRef(null);
    // const investigatingDepartmentID = useRef(null);
    // const timeRaised = useRef(null);
    // const priority = useRef(null);
    // const severity = useRef(null);
    // const impact = useRef(null);

    useEffect(() => {
        //Set date to today
        document.getElementById('dateInput').value = (new Date()).toISOString().substr(0,10);

        var date = new Date();
        var currentTime = date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
        document.getElementById('timeInput').value = currentTime;

         //Get departments data
         const fetchData = async () => {
            await getDepartments().then(resp => setDepartments(resp));
        };
        fetchData();
    }, []);

    

    function postNewEndUserIncident(event) {
        event.preventDefault();
        axios.post('http://127.0.0.1/api/incident/new',  {
            'raisedID': sessionStorage.getItem('username'),
            'affectedID': sessionStorage.getItem('username'),
            'investigatingDepartmentID': departmentSelect.current.value,
            'description': description.current.value,
            'priority': 'P3',
            'severity': 'S3',
            'impact': 'IMP1',
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

    // function postIncident(){
    //     axios({
    //         method:'post',
    //         url:'http://127.0.0.1/api/incident/new',
    //         params: {
    //             'raisedID':sessionStorage.getItem('username'),
    //             'affectedID':affectedID,
    //             'investigatingDepartmentID':investigatingDepartmentID,
    //             'description': description,
    //             'timeRaised':timeRaised,
    //             'priority':priority,
    //             'severity':severity,
    //             'impact':impact
    //         }
    //     });
    // }

    return (
        <>
          <h2 className="subheading">Report Incident</h2>

          <div className="background-container">
            <form onSubmit={postNewEndUserIncident}>
                <label>Date</label>
                <input type="date" placeholder="Date" id="dateInput"></input>
                <br />

                <label>Time</label>
                <input type="time" placeholder="Time" id="timeInput"></input>
                <br />

                {/* <label>Unit</label>
                <input type="text" placeholder="Unit"></input>
                <br /> */}

                <label>Department</label>
                    <select value={departments.departmentID} ref={departmentSelect}>
                        {
                            departments.data.map(department => (
                                <option key={department.departmentID} value={department.departmentID}>{`${department.departmentID} - ${department.name}`}</option>
                            ))
                        }
                    </select>
                <br />

                <label>Incident Description</label>
                <br />
                <textarea placeholder="Max 200 characters" ref={description}></textarea>
                <br />

                <button>Submit</button>
            </form>
          </div>
        </>
    );
}

export default EndUserReportIncident;