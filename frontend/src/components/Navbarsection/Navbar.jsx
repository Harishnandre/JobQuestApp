import React from 'react';
import './Navbar.css';

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
            <li>Home</li>
            <li>Jobs</li>
            <li>Browse</li>
            </div>
             <li>
              <button className="signup-button">Sign Up</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;


