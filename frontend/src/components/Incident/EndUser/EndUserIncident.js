import React, { useState } from 'react';

import EndUserReportIncident from './EndUserReportIncident';
import EndUserViewIncident from './EndUserViewIncident';
import EndUserAddNote from './EndUserAddNote';
import EndUserRequestPriority from './EndUserRequestPriority';

function EndUserIncident() {

  const [selectedIncident, setSelectedIncident] = useState({});

  return (
    <>
      <h1>End User</h1>
      <div className="row">
        <div className="col-md-4">
          <EndUserReportIncident />
        </div>
        
        <div className="col-md-8">
          <EndUserViewIncident selectedIncident={selectedIncident} setSelectedIncident={setSelectedIncident}/>
          <EndUserAddNote selectedIncident={selectedIncident}/>
          <EndUserRequestPriority selectedIncident={selectedIncident}/>
        </div>
      </div>
    </>
  );
}

export default EndUserIncident;
