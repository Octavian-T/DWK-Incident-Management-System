import React from 'react';

import './css/ReportIncident.css';

function ReportIncident() {
    return (
      <div className="col-md-4">
        <h2 className="subheading">Report Incident</h2>

        <div className="background-container">
            <form>
                <input type="date" placeholder="Date"></input>
                <br />
                <input type="time" placeholder="Time"></input>
                <br />

                <label>Raised by</label>
                <input type="text" placeholder="Staff Name"></input>
                <br />

                <input type="text" placeholder="IncidentID"></input>
                <br />

                <label>Incident Type</label>
                <select>
                    <option>1</option>
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
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                </select>

                <label>Severity</label>
                <select>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                </select>

                <label>Impact</label>
                <select>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                </select>
                <br />

                <button>Submit</button>
            </form>
        </div>
      </div>
    );
}

export default ReportIncident;