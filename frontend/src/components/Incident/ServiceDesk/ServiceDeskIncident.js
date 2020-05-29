import React from 'react';

import ServiceDeskReportIncident from './ServiceDeskReportIncident';
import ServiceDeskViewIncident from './ServiceDeskViewIncident';

function ServiceDeskIncident() {
  return (
    <>
      <h1>Service Desk</h1>
      <div className="row">
        <ServiceDeskReportIncident />
        <ServiceDeskViewIncident />
      </div>
    </>
  );
}

export default ServiceDeskIncident;
