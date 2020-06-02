import React, {useEffect, useRef, useState} from 'react';

import axios from 'axios';

import '../../css/ReportIncident.css'

function TechnicianUpdateIncident(props) {

    const [technicians, setTechnicians] = useState({'data':[]});

    const incidentID = useRef(0);
    const date = useRef('Date');
    const time = useRef('Time');
    const priority = useRef('P1');
    const severity = useRef('S1');
    const impact = useRef('IMP1');
    const technicianID = useRef(0);

    function updateTechnicianIncident(event) {
        event.preventDefault();
        console.log(technicianID.current.value);
        axios.put('http://127.0.0.1/api/incident/'+props.selectedIncidentID, {
            'investigatingTechnicianID':technicianID.current.value,
            'priority':priority.current.value,
            'severity':severity.current.value,
            'impact':impact.current.value,
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
    useEffect(()=>{
        axios.get('http://127.0.0.1/api/department/'+sessionStorage.getItem('departmentID')+'/members', {
                    headers: {
                        'Authorization': 'Bearer ' + sessionStorage.getItem('access_token'),
                        'Access-Control-Allow-Origin': '*'
                    }
                })
                .then(resp => {
                    setTechnicians(resp.data);
                })
                .catch(error => {
                    if(error.response.status === 422){
                        alert("Error " + error.response.status + " - Not logged in");
                        window.location.replace("/");
                    }
                });
    }, [])
    useEffect( ()=>{
        axios.get("http://127.0.0.1/api/incident/"+props.selectedIncidentID, {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('access_token'),
                'Access-Control-Allow-Origin': '*'
            }
        })
        .then(function(response){
            var x_date = response.data.timeRaised;
            x_date = x_date.split(' ');
            incidentID.current.value=props.selectedIncidentID;
            date.current.value=x_date[0];
            time.current.value=x_date[1];
            impact.current.value = response.data.impact;
            priority.current.value = response.data.priority;
            severity.current.value = response.data.severity;
            technicianID.current.value = response.data.investigatingTechnicianID;
        })
        .catch(function(error){
            console.log(error);
        });
    }, [props.selectedIncidentID]);

    return (
        <>
          <h2 className="subheading">Report Incident</h2>

          <form >
            <div className="background-container">
                <label>Date</label>
                <input type="text" id="dateInput" ref={date}></input>
                <br />
                <label>Time</label>
                <input type="disabled" id="timeInput" ref={time}></input>
                <br />

                <label>Incident ID</label>
                <input type="disabled" ref={incidentID}></input>
                <br />

                <label>Technician ID</label>
                <br />
                <select ref={technicianID}> 
                        {technicians.data.map(technician =>(
                            <option value={technician.username}>{technician.firstName}</option>
                        ))}
                </select>
                <br />

            </div>
            <div>
                <br />
            </div>
            <div className="background-container">
                <div className="incidentMeasurementSelect">
                    <label htmlFor="prioritySelect">Priority</label>
                    <select id="prioritySelect" ref={priority}> 
                        <option value="P1">P1</option>
                        <option value="P2">P2</option>
                        <option value="P3">P3</option>
                    </select>
                </div>
                <br />
                <div className="incidentMeasurementSelect">
                    <label htmlFor="severitySelect">Severity</label>
                    <select id="severitySelect" ref={severity}> 
                        <option value="S1">S1</option>
                        <option value="S2">S2</option>
                        <option value="S3">S3</option>
                    </select>
                </div>
                <br />
                <div className="incidentMeasurementSelect">
                    <label htmlFor="impactSelect">Impact</label>
                    <select id="impactSelect" ref={impact}> 
                        <option value="IMP1">IMP1</option>
                        <option value="IMP2">IMP2</option>
                        <option value="IMP3">IMP3</option>
                    </select>
                </div>
                <br />
                <button onClick={updateTechnicianIncident}>Submit</button>
            </div>
          </form>
        </>
    );
}

export default TechnicianUpdateIncident;