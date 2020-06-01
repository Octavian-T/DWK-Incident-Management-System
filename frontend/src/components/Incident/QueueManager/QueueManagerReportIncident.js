import React, {useEffect, useState} from 'react';

import axios from 'axios';

import '../../css/ReportIncident.css'

function QueueManagerReportIncident(props) {
    //const [investigatingUnitID, setInvestigatingUnitID] = useRef({"data":[]});
    const [data, setData] = useState({'data':[]});

    function updateQueueManagerIncident(event) {
        event.preventDefault();

        axios.put('http://127.0.0.1/api/incident/'+props.selectedIncidentID,  {
            'investigatingDepartmentID':props.investigatingDepartmentID,
            //'investigatingUnitID':investigatingUnitID.current.value,
            'priority':props.priority,
            'severity':props.severity,
            'impact':props.impact
        }, {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('access_token'),
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Headers': '*'
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
    var departments = {'data':[]};
    axios.get('http://127.0.0.1/api/department/all', {
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('access_token'),
            'Access-Control-Allow-Origin': '*'
    }}).then(res=>{
        setData(res.data);
        console.log(departments.data);
    })
    .catch(error =>{
        alert(error);
    });

    useEffect( ()=>{
        document.getElementById('dateInput').value=props.date;
        //document.getElementById('timeInput').value=date[4]+date[5];
        document.getElementById('incidentID').value=props.selectedIncidentID;
        //document.getElementById('investigatingUnitID').value=props.investigatingUnitID;
        //document.getElementById('departmentSelect').value=props.investigatingDepartmentID;
        document.getElementById('impactSelect').value = props.impact;
        document.getElementById('prioritySelect').value = props.priority;
        document.getElementById('severitySelect').value = props.severity;
    });

    return (
        <>
          <h2 className="subheading">Report Incident</h2>
          <form >
            <div className="background-container">
                <label>Date</label>
                <input type="text" value="Date" id="dateInput"></input>
                <br />
                <label>Time</label>
                <input type="disabled" value="Time" id="timeInput"></input>
                <br />

                <label>Incident ID</label>
                <input type="disabled" id="incidentID" place></input>
                <br />

                <label>Unit</label>
                <br />
                <input type="text" id="investigatingUnitID"></input>
                <br />

                <label>Department</label>
                <br />
                <select id="departmentSelect" onChange={event => props.setInvestigatingDepartmentID(event.target.value)}> 
                        {
                        data.data.map(department=>
                            <option value={department.departmentID}>{department.name}</option>
                        )
                        }
                </select>
                <br />

            </div>
            <div>
                <br />
            </div>
            <div className="background-container">
                <div className="incidentMeasurementSelect">
                    <label htmlFor="prioritySelect">Priority</label>
                    <select id="prioritySelect" onChange={event => props.setPriority(event.target.value)}> 
                        <option value="P1">P1</option>
                        <option value="P2">P2</option>
                        <option value="P3">P3</option>
                    </select>
                </div>
                <br />
                <div className="incidentMeasurementSelect">
                    <label htmlFor="severitySelect">Severity</label>
                    <select id="severitySelect" onChange={event => props.setSeverity(event.target.value)}> 
                        <option value="S1">S1</option>
                        <option value="S2">S2</option>
                        <option value="S3">S3</option>
                    </select>
                </div>
                <br />
                <div className="incidentMeasurementSelect">
                    <label htmlFor="impactSelect">Impact</label>
                    <select id="impactSelect" onChange={event => props.setImpact(event.target.value)}> 
                        <option value="I1">I1</option>
                        <option value="I2">I2</option>
                        <option value="I3">I3</option>
                    </select>
                </div>
                <br />
                <button onClick={updateQueueManagerIncident}>Submit</button>
            </div>
          </form>
        </>
    );
}

export default QueueManagerReportIncident;