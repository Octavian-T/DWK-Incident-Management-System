import React, { useState } from 'react';

import TechnicianReportIncident from './TechnicianReportIncident';
import TechnicianViewIncident from './TechnicianViewIncident';
import TechnicianAddNote from './TechnicianAddNote';

function TechnicianIncident() {

  const [selectedIncidentID, setSelectedIncidentID] = useState();

  return (
    <>
      <div className="row">
        <div className="col-md-4">
          <TechnicianReportIncident />
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
