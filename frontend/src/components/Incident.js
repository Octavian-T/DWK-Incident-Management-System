import React, { useEffect } from 'react';

import axios from 'axios';

// import ReportIncident from './Incident/ReportIncident';
// import ViewIncident from './Incident/ViewIncident';

import EndUserIncident from './Incident/EndUser/EndUserIncident';
import ServiceDeskIncident from './Incident/ServiceDesk/ServiceDeskIncident';

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

  if (depID == 1){
    incidentPage = <EndUserIncident />
  }
  //Service desk staff
  else if (depID == 7){
    incidentPage = <ServiceDeskIncident />
  }

  return (
    <>
      <div className="row">
        {/* { sessionStorage.getItem('departmentID') == 1 ? <EndUserIncident /> : "" } */}
        {incidentPage}
      </div>
    </>
  );
}

export default Incident;
