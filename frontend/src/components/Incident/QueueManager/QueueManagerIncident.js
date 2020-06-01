import React, { useState } from 'react';

import QueueManagerReportIncident from './QueueManagerReportIncident';
import QueueManagerViewIncident from './QueueManagerViewIncident';

function QueueManagerIncident() {

  const [selectedIncidentID, setSelectedIncidentID] = useState(0);

  return (
    <>
      <div className="row">
        <div className="col-md-4">
          <QueueManagerReportIncident selectedIncidentID={selectedIncidentID} />
        </div>
        <div className="col-md-8">
          <QueueManagerViewIncident setSelectedIncidentID={setSelectedIncidentID} />
        </div>
      </div>
    </>
  );
}

export default QueueManagerIncident;
