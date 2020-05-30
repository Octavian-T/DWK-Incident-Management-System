import React from 'react';

import ServiceDeskReportIncident from './ServiceDeskReportIncident';
import ServiceDeskViewIncident from './ServiceDeskViewIncident';

function ServiceDeskIncident() {
  return (
    <>
      <h1>Service Desk</h1>
      <div className="row">
        <div className="col-md-4">
          <ServiceDeskReportIncident />
        </div>
        
        <div className="col-md-8">
          <ServiceDeskViewIncident />
        </div>
      </div>
    </>
  );
}

export default ServiceDeskIncident;
