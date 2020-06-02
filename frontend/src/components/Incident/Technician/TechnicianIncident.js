import React, { useState } from 'react';

import TechnicianReportIncident from './TechnicianReportIncident';
import TechnicianUpdateIncident from './TechnicianUpdateIncident';
import TechnicianViewIncident from './TechnicianViewIncident';
import TechnicianAddNote from './TechnicianAddNote';
import TechnicianUpdateProgress from './TechnicianUpdateProgress';

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
          { state === 'update' && <TechnicianUpdateIncident selectedIncidentID={selectedIncidentID}/>}
        </div>
        
        <div className="col-md-8">
          <TechnicianViewIncident selectedIncidentID={selectedIncidentID} setSelectedIncidentID={setSelectedIncidentID} state={state}/>
          { state === 'update' && <TechnicianAddNote selectedIncidentID={selectedIncidentID}/>}
          { state === 'update' && <TechnicianUpdateProgress />}
        </div>
      </div>
    </>
  );
}

export default TechnicianIncident;
