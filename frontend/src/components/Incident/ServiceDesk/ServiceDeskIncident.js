import React, { useState } from 'react';

import ServiceDeskReportIncident from './ServiceDeskReportIncident';
import ServiceDeskViewIncident from './ServiceDeskViewIncident';
import ServiceDeskAddNote from './ServiceDeskAddNote';

function ServiceDeskIncident() {

  const [selectedIncidentID, setSelectedIncidentID] = useState();

  return (
    <>
      <h1>Service Desk</h1>
      <div className="row">
        <div className="col-md-4">
          <ServiceDeskReportIncident />
        </div>
        
        <div className="col-md-8">
          <ServiceDeskViewIncident selectedIncidentID={selectedIncidentID} setSelectedIncidentID={setSelectedIncidentID}/>
          <ServiceDeskAddNote selectedIncidentID={selectedIncidentID}/>
        </div>
      </div>
    </>
  );
}

export default ServiceDeskIncident;
