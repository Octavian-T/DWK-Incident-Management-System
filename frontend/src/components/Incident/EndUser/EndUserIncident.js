import React, { useState } from 'react';

import EndUserReportIncident from './EndUserReportIncident';
import EndUserViewIncident from './EndUserViewIncident';
import EndUserAddNote from './EndUserAddNote';

function EndUserIncident() {

  const [selectedIncidentID, setSelectedIncidentID] = useState();

  return (
    <>
      <div className="row">
        <div className="col-md-4">
          <EndUserReportIncident />
        </div>
        
        <div className="col-md-8">
          <EndUserViewIncident setSelectedIncidentID={setSelectedIncidentID}/>
          <EndUserAddNote selectedIncidentID={selectedIncidentID}/>
        </div>
      </div>
    </>
  );
}

export default EndUserIncident;