import React, {useRef} from 'react';

import axios from 'axios';

import './css/ReportIncident.css';

function ReportIncident() {
    const affectedID = useRef(null);
    const investigatingDepartmentID = useRef(null);
    const description = useRef(null);
    const timeRaised = useRef(null);
    const priority = useRef(null);
    const severity = useRef(null);
    const impact = useRef(null);

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
        <form onSubmit={postIncident}>
            <div className="form-group">
                <label>Date</label>
                <input className="form-control" type="text" placeholder="YYYY-MM-DD HH:MM:SS" ref={timeRaised}></input>
                <label>Raised for</label>
                <input className="form-control" type="text" placeholder="Username" ref={affectedID}></input>
            </div>
            <div classname="gorm-group">
                <label>Department</label>
                <div className="dopdown-menu">
                    <a className="dropdown-item" ></a>
                </div>
                <label>Unit</label>
                <div className="dopdown-menu">
                    <a className="dropdown-item" ></a>
                </div>
            </div>
            <div className="form-group">
                <label>Incident description</label>
                <textarea clasName="form-control" rows="3" ref={description}></textarea>
            </div>
            <div className="form-group">
                <label>Assign</label>
                <div className="dopdown-menu">
                    <a className="dropdown-item" onClick={function(){investigatingDepartmentID = this.val; console.log(this.val) }}></a>
                </div>
            </div>
            <div className="form-group">
                <label>Priority</label>
                <div className="dopdown-menu">
                    <a className="dropdown-item" onClick={function(){priority = this.val; console.log(this.val) }}></a>
                </div>
                <label>Severity</label>
                <div className="dopdown-menu">
                    <a className="dropdown-item" onClick={function(){severity = this.val; console.log(this.val) }}></a>
                </div>
                <label>Impact</label>
                <div className="dopdown-menu">
                    <a className="dropdown-item" onClick={function(){impact = this.val; console.log(this.val) }}></a>
                </div>
            </div>  
            <div className="form-group">
                <button>Submit</button>
            </div>
        </form>
      </div>
    );
}

export default ReportIncident;