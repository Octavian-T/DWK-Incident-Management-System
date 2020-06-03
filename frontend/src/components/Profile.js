import React from 'react';

function Profile() {
  return (
    <>
      <div className="row">
          <div className="col-12 text-center">
                <br/>
                <h1>{sessionStorage.getItem('first_name') + ' ' + sessionStorage.getItem('last_name')} </h1>
                <br/>
                <h3><small>{'Username: '}</small>{sessionStorage.getItem('username')}</h3>
                <br/>
                <h3><small>{'Department: '}</small>{sessionStorage.getItem('department')}</h3>
                <br></br>
                <h3><small>{'Role: '}</small>{sessionStorage.getItem('role')}</h3>
          </div>
      </div>
    </>
  );
}

export default Profile;
