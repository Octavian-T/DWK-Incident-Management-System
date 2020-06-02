import React, { useState } from 'react';

import QueueManagerReportIncident from './QueueManagerUpdateIncident';
import QueueManagerUpdateIncident from './QueueManagerUpdateIncident';
import QueueManagerViewIncident from './QueueManagerViewIncident';

function QueueManagerIncident() {

  const [selectedIncidentID, setSelectedIncidentID] = useState(0);
  var state = 'report';

  return (
    <>
      <div className="row">
            <button onClick={state = 'report'}>New</button>
            <button onClick={state = 'update'}>Update</button>
      </div>
      <div className="row">
        <div className="col-md-4">
          { state == 'update' ? <QueueManagerUpdateIncident selectedIncidentID={selectedIncidentID} /> : <QueueManagerReportIncident />}          
        </div>
        <div className="col-md-8">
          <QueueManagerViewIncident setSelectedIncidentID={setSelectedIncidentID} />
        </div>
      </div>
    </>
  );
}

export default QueueManagerIncident;
