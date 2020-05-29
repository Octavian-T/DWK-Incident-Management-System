import React, { useEffect } from 'react';

import axios from 'axios';

// import ReportIncident from './Incident/ReportIncident';
// import ViewIncident from './Incident/ViewIncident';

import EndUserIncident from './Incident/EndUser/EndUserIncident';

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

  return (
    <>
      <div className="row">
        <EndUserIncident />
      </div>
    </>
  );
}

export default Incident;
