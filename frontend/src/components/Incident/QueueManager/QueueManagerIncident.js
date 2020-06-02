import React, { useState } from 'react';

import QueueManagerReportIncident from './QueueManagerReportIncident';
import QueueManagerUpdateIncident from './QueueManagerUpdateIncident';
import QueueManagerViewIncident from './QueueManagerViewIncident';

function QueueManagerIncident() {

  const [selectedIncidentID, setSelectedIncidentID] = useState(1);
  const [state, setState] = useState('report');

  return (
    <>
      <div className="row">
            <button onClick={() => setState('report')}>New</button>
            <button onClick={() => setState('update')}>Update</button>
      </div>
      <div className="row">
        <div className="col-md-4">
          { state === 'update' && <QueueManagerUpdateIncident selectedIncidentID={selectedIncidentID} />}
          { state === 'report' && <QueueManagerReportIncident /> }
        </div>
        <div className="col-md-8">
          <QueueManagerViewIncident setSelectedIncidentID={setSelectedIncidentID} state={state}/>
        </div>
      </div>
    </>
  );
}

export default QueueManagerIncident;
