import React from 'react';
import './index.css';
import {Link} from 'react-router-dom'
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="box1">
        <h1 className="logo">
          👨‍💼 Job <span className="highlight">Quest</span>
        </h1>
        <div className="box2">
          <ul className="box21">
            <div className='change'>
            <li><Link to='/'>Home</Link></li>
            <li> <Link to='/jobs'>Jobs</Link></li>
          <li> <Link to="/login">Login</Link> </li>
          <li><Link to='/register'>Register</Link></li>
          <li><Link to='/dashboard'>Dashboard</Link></li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;


