import React, { useState } from 'react';

import TechnicianReportIncident from './TechnicianReportIncident';
import TechnicianUpdateIncident from './TechnicianUpdateIncident';
import TechnicianViewIncident from './TechnicianViewIncident';
import TechnicianAddNote from './TechnicianAddNote';

function TechnicianIncident() {

  const [selectedIncidentID, setSelectedIncidentID] = useState(1);
  const [state, setState] = useState('report');

  return (
    <>
      <div className="row">
            <button onClick={() => setState('report')}>New</button>
            <button onClick={() => setState('update')}>Update</button>
      </div>
      <div className="row">
        <div className="col-md-4">
          { state === 'report' && <TechnicianReportIncident />}
          { state === 'update' && <TechnicianUpdateIncident />}
        </div>
        
        <div className="col-md-8">
          <TechnicianViewIncident selectedIncidentID={selectedIncidentID} setSelectedIncidentID={setSelectedIncidentID}/>
          <TechnicianAddNote selectedIncidentID={selectedIncidentID}/>
        </div>
      </div>
    </>
  );
}

export default TechnicianIncident;
