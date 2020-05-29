import React from 'react';

import EndUserReportIncident from './EndUserReportIncident';
import EndUserViewIncident from './EndUserViewIncident';

function EndUserIncident() {
  return (
    <>
      <div className="row">
        <EndUserReportIncident />
        <EndUserViewIncident />
      </div>
    </>
  );
}

export default EndUserIncident;
