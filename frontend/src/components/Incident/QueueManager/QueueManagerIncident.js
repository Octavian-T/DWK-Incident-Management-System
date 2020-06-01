import React, { useState } from 'react';

import QueueManagerReportIncident from './QueueManagerReportIncident';
import QueueManagerViewIncident from './QueueManagerViewIncident';

function QueueManagerIncident() {

  const [selectedIncidentID, setSelectedIncidentID] = useState(0);
  const [investigatingUnitID, setInvestigatingUnitID] = useState(0);
  const [investigatingDepartmentID, setInvestigatingDepartmentID] = useState(0);
  const [severity, setSeverity] = useState('');
  const [impact, setImpact] = useState('');
  const [priority, setPriority] = useState('');
  const [date, setDate] = useState('');

  return (
    <>
      <div className="row">
        <div className="col-md-4">
          <QueueManagerReportIncident 
            date={date} 
            selectedIncidentID={selectedIncidentID} 
            priority={priority} 
            setPriority={setPriority} 
            impact={impact} 
            setImpact={setImpact}  
            severity={severity} 
            setSeverity={setSeverity}  
            investigatingDepartmentID={investigatingDepartmentID} 
            investigatingUnitID={investigatingUnitID}
            setInvestigatingDepartmentID={setInvestigatingDepartmentID} 
            setInvestigatingUnitID={setInvestigatingUnitID} 
          />
        </div>
        <div className="col-md-8">
          <QueueManagerViewIncident 
            selectedIncidentID={selectedIncidentID} 
            setSelectedIncidentID={setSelectedIncidentID} 
            date={date} 
            setDate={setDate} 
            priority={priority} 
            setPriority={setPriority} 
            impact={impact} 
            setImpact={setImpact} 
            severity={severity} 
            setSeverity={setSeverity} 
            investigatingDepartmentID={investigatingDepartmentID} 
            setInvestigatingDepartmentID={setInvestigatingDepartmentID} 
            investigatingUnitID={investigatingUnitID} 
            setInvestigatingUnitID={setInvestigatingUnitID}
          />
        </div>
      </div>
    </>
  );
}

export default QueueManagerIncident;
