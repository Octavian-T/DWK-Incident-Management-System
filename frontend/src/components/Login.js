import React, { useRef } from 'react';

import axios from 'axios';
import md5 from 'md5';

import './css/Login.css';
import lock from './icons/lock.svg';

function Login() {

  const usernameInput = useRef(null);
  const passwordInput = useRef(null);

  function processCredentials(){
    axios.post('http://127.0.0.1/api/login', JSON.stringify({ username: usernameInput.current.value, password: md5(passwordInput.current.value) }))
      .then(res => {
        console.log(res)
      });
  }

  return (
    <>
      <div className="row">
        <div className="col-md-4 col-md-offset-4">

        <h2 className="subheading">Incident Reporting</h2>

        <div className="background-container">
          <img src={lock} alt=""/>
          <form>
            <input type="text" placeholder="Username" ref={usernameInput}></input>
            <br></br>
            <input type="password" placeholder="Password" ref={passwordInput}></input>
            <br></br>
            <button onClick={processCredentials}>Log in</button>
          </form>
        </div>

        </div>
      </div>
    </>
  );
}

export default Login;
