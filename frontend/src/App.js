import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import ViewIncidents from './components/ViewIncidents';
import Error from './components/Error';


function App() {
  return (
    <>
      <h1>DWK PLC Incident Management System</h1>

      <Navbar />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} />
        <Route path="/incidents" component={ViewIncidents} />
        <Route component={Error} />
      </Switch>
    </>
  );
}

export default App;
