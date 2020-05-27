import React from 'react';

import ReportIncident from './ReportIncident';
import ViewIncident from './ViewIncident';

function Incident() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col" style={{backgroundColor: "red"}}>test</div>
          <div className="col" style={{backgroundColor: "blue"}}>test</div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <ReportIncident />
          <ViewIncident />
        </div>
      </div>
    </>
  );
}

export default Incident;
