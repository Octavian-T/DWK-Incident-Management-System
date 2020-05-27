import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import ViewIncidents from './components/ViewIncidents';
import Error from './components/Error';

import './components/css/Main.css';


function App() {
  return (
    <>
      <div className="main-header">
        <h1>DWK PLC</h1>
      </div>
      
      <div className="content-container">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} />
          <Route path="/incidents" component={ViewIncidents} />
          <Route component={Error} />
        </Switch>
      </div>
    </>
  );
}

export default App;
