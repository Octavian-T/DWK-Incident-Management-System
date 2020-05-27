import React from 'react';

function ViewIncident() {
    return (
      <div className="col">
        <h2 className="subheading">View Incident</h2>

        <div className="background-container">
            <select>
                <option>1</option>
                <option>2</option>
                <option>3</option>
            </select>

            <button>Submit</button>
            <br />

            <select>
                <option>1</option>
                <option>2</option>
                <option>3</option>
            </select>

            <button>Submit</button>
            <br />

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Location</th>
                        <th>Description</th>
                        <th>Team</th>
                        <th>Notes</th>
                        <th>Priority</th>
                        <th>Severity</th>
                        <th>Impact</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>1</th>
                        <th>Block 1</th>
                        <th>test</th>
                        <th>Technicians</th>
                        <th>Test note</th>
                        <th>1</th>
                        <th>2</th>
                        <th>3</th>
                    </tr>
                </tbody>
            </table>
        </div>
      </div>
    );
}

export default ViewIncident;