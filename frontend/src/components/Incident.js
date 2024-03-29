import React, { useEffect } from 'react';

import axios from 'axios';

// import ReportIncident from './Incident/ReportIncident';
// import ViewIncident from './Incident/ViewIncident';

import EndUserIncident from './Incident/EndUser/EndUserIncident';
import ServiceDeskIncident from './Incident/ServiceDesk/ServiceDeskIncident';
import TechnicianIncident from './Incident/Technician/TechnicianIncident'
import MajorIncidentManagerIncident from './Incident/MajorIncidentManager/MajorIncidentManagerIncident';
import QueueManagerIncident from './Incident/QueueManager/QueueManagerIncident';
import ResolverIncident from './Incident/Resolver/ResolverIncident';

function Incident() {

  useEffect(() => {
    axios.get('http://127.0.0.1/api/incident/all', {
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('access_token'),
            'Access-Control-Allow-Origin': '*'
        }
    })
    .catch(error => {
        if(error.response.status === 422){
            alert("Error " + error.response.status + " - Not logged in");
            window.location.replace("/");
        }
    })
  }, []);

  let incidentPage;
  let depID = sessionStorage.getItem('departmentID')

  //End user
  if (depID === "1") incidentPage = <EndUserIncident />
  //Service desk staff
  else if (depID === "7") incidentPage = <ServiceDeskIncident />
  //Technician
  else if (depID === "2") incidentPage = <TechnicianIncident />
  //Queue Manager
  else if (depID === "3") incidentPage = <QueueManagerIncident />
  //Major Incident Manager
  else if (depID === "5") incidentPage = <MajorIncidentManagerIncident />
  //Resolvers
  else if (depID === "6") incidentPage = <ResolverIncident />
  return (
    <>
      <div className="row">
        {incidentPage}
      </div>
    </>
  );
}

export default Incident;
