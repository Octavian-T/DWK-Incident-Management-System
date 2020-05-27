import React from 'react';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Incident from './components/Incident';
import Error from './components/Error';

import './components/css/Main.css';


function App() {
  return (
    <>
      <div className="main-header">
        <h1><Link to="/" id="headingLogo">DWK PLC</Link></h1>
      </div>
      
      <Navbar />
      <div className="content-container">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} />
          <Route path="/incidents" component={Incident} />
          <Route component={Error} />
        </Switch>
      </div>
    </>
  );
}

export default App;
