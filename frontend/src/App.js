import React from 'react';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Incident from './components/Incident';
import Message from './components/Message';
import Error from './components/Error';
import SignOut from './components/SignOut';

import './components/css/Main.css';
import './components/css/Header.css';


function App() {

  function toggleNavbar(){
    var nav = document.getElementsByClassName('navbar-container')[0];
    nav.style.display === "block" ? nav.style.display = "none" : nav.style.display = "block";
  }

  return (
    <>
      <header>
        <span className="header-left">
          <h1><Link to="/" id="headingLogo">DWK PLC</Link></h1>
        </span>

        <span className="header-right">
          
            {
              sessionStorage.getItem('access_token') ? <p>{sessionStorage.getItem('first_name')}</p> : <Link to="login">Log in</Link>
            }
          
          <button onClick={toggleNavbar}>Menu</button>
        </span>
      </header>
      
      <Navbar />
      <div className="container">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} />
          <Route path="/signout" component={SignOut} />
          <Route path="/incidents" component={Incident} />
          <Route path="/messages" component={Message} />
          <Route component={Error} />
        </Switch>
      </div>
    </>
  );
}

export default App;