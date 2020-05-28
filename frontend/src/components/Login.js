import React from 'react';

import './css/Login.css';

import lock from './icons/lock.svg';

function Login() {
  return (
    <>
      <div className="row">
        <div className="col-md-4 col-md-offset-4">

        <h2 className="subheading">Incident Reporting</h2>

        <div className="background-container">
          <img src={lock} alt=""/>
          <form>
            <input type="text" placeholder="Username"></input>
            <br></br>
            <input type="password" placeholder="Password"></input>
            <br></br>
            <button>Log in</button>
          </form>
        </div>

        </div>
      </div>
    </>
  );
}

export default Login;
