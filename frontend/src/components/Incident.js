import React from 'react';

import ReportIncident from './ReportIncident';
import ViewIncident from './ViewIncident';

function Incident() {
  return (
    <>
      <div className="row">
        <ReportIncident />
        <ViewIncident />
      </div>
    </>
  );
}

export default Incident;
