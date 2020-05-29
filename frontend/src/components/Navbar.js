import React from 'react';
import { Link } from "react-router-dom";

import './css/Navbar.css'

function NavBar() {

  function hideNavbar() {
    var nav = document.getElementsByClassName('navbar-container')[0];
    nav.style.display = "none"
  }

  return (
    <div className="navbar-container">
        <button className="navbar-exit-btn" onClick={hideNavbar}>X</button>
        <ul>
            <li>&nbsp;</li>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/messages">Messages</Link></li>
            <li><Link to="/incidents">Incidents</Link></li>
            <li><Link to="/reports">Reports</Link></li>
            <li><Link to="/profile">Profile</Link></li>

            <div className="navbar-bottom">
              {
                !sessionStorage.getItem('access_token') ?
                  <li><Link to="/login">Login</Link></li>
                :
                  <li><Link to="/signout">Sign out</Link></li>  
              }
            </div>
        </ul>
    </div>
  );
}

export default NavBar;