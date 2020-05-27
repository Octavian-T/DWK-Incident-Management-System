import React from 'react';
import {Link} from "react-router-dom";

function NavBar() {
  return (
    <div>
        <ul style={{listStyle: 'none'}}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/incidents">Incidents</Link></li>
        </ul>
    </div>
  );
}

export default NavBar;
