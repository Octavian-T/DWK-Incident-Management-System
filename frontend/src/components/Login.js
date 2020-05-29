import React, { useRef } from 'react';

import axios from 'axios';
import md5 from 'md5';

import './css/Login.css';
import lock from './icons/lock.svg';

function Login() {

  const usernameInput = useRef(null);
  const passwordInput = useRef(null);

  function processCredentials(event){
    console.log({ "username": usernameInput.current.value, "password": md5(passwordInput.current.value) });
    axios.post('http://127.0.0.1/api/login', { "username": usernameInput.current.value, "password": md5(passwordInput.current.value) })
      .then(res => {
        console.log(res.data);

        sessionStorage.setItem('access_token', res.data.access_token);
        sessionStorage.setItem('username', res.data.username);
        sessionStorage.setItem('first_name', res.data.firstName);
        sessionStorage.setItem('last_name', res.data.lastName);
        sessionStorage.setItem('departmentID', res.data.departmentID);
      })
      .catch(error => {
        console.log(error.response.data);
        alert(error.response.data.error);
      });
  }

  return (
    <>
      <div className="row">
        <div className="col-md-4 col-md-offset-4">

          <h2 className="subheading">Incident Reporting</h2>

          <div className="background-container">
            <img src={lock} alt=""/>
            <form onSubmit={processCredentials}>
              <input type="text" placeholder="Username" name="username" ref={usernameInput}></input>
              <br></br>
              <input type="password" placeholder="Password" name="password" ref={passwordInput}></input>
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
