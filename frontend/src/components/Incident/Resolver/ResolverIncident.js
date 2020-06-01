import React, { useState } from 'react';

import ResolverReportIncident from './ResolverReportIncident';
import ResolverViewIncident from './ResolverViewIncident';

function ResolverIncident() {

  const [selectedIncidentID, setSelectedIncidentID] = useState();

  return (
    <>
      <div className="row">
        <div className="col-md-4">
          <ResolverReportIncident date={date} selectedIncidentID={selectedIncidentID} priority={priority} setPriority={setPriority}  impact={impact} setImpact={setImpact}  severity={severity} setSeverity={setSeverity}  investigatingDepartmentID={investigatingDepartmentID} investigatingUnitID={investigatingUnitID}/>
        </div>
        <div className="col-md-8">
          <ResolverViewIncident 
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

export default ResolverIncident;
