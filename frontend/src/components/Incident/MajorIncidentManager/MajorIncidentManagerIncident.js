import React, { useState } from 'react';

import MajorIncidentManagerViewIncident from './MajorIncidentManagerViewIncident';

function MajorIncidentManagerIncident() {

  const [selectedIncidentID, setSelectedIncidentID] = useState();

  return (
    <>
      <h1>Major Incident Manager</h1>
      <div className="row">
        <div className="col-md-10">
          <MajorIncidentManagerViewIncident selectedIncidentID={selectedIncidentID} setSelectedIncidentID={setSelectedIncidentID}/>
        </div>
        
        <div className="col-md-4">
          {/* <EndUserViewIncident selectedIncidentID={selectedIncidentID} setSelectedIncidentID={setSelectedIncidentID}/> */}
          {/* <EndUserAddNote selectedIncidentID={selectedIncidentID}/> */}
        </div>
      </div>
    </>
  );
}

export default MajorIncidentManagerIncident;
