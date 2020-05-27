import React from 'react';

import './css/Login.css';

import lock from './icons/lock.svg';

function Login() {
  return (
    <>
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
    </>
  );
}

export default Login;
