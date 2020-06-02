import React, { useState } from 'react';

import ResolverReportIncident from './ResolverReportIncident';
import ResolverUpdateIncident from './ResolverUpdateIncident';
import ResolverViewIncident from './ResolverViewIncident';

function ResolverIncident() {

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
          { state === 'update' && <ResolverUpdateIncident selectedIncidentID={selectedIncidentID} />}
          { state === 'report' && <ResolverReportIncident /> }
        </div>
        <div className="col-md-8">
          <ResolverViewIncident setSelectedIncidentID={setSelectedIncidentID} state={state}/>
        </div>
      </div>
    </>
  );
}

export default ResolverIncident;
