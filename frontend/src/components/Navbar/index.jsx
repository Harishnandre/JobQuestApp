import React, { useContext } from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import { Authcontext } from '../ContextAPI/Authcontext';

const Navbar = () => {
  let [auth, setauth, isLoggedIn, setisLoggedIn] = useContext(Authcontext);
  const { user } = auth;
  const { role, fullName ,profile} = user || {};

  let handlelogout = () => {
    setauth({
      ...auth,
      user: null,
      token: ""
    });
    setisLoggedIn(false);
    localStorage.removeItem('auth');
  };

  return (
    <div className="navbar">
      <div className="box1">
        <h1 className="logo">
          <img src="/businessman.png" alt="Logo" className='logo-img' /> Job <span className="highlight">Quest</span>
        </h1>
        <div className="box2">
          <ul className="box21">
            <div className='change'>
              {/* Conditional rendering based on role */}
              {role === "Recruiter" ? (
                <>
                  <li><Link to='/admin/companies'>Companies</Link></li>
                  <li><Link to='/admin/jobs'>Jobs</Link></li>
                </>
              ) : role === "Job-Seeker" ? (
                <>
                  <li><Link to='/'>Home</Link></li>
                  <li><Link to='/jobs'>Jobs</Link></li>
                  <li><Link to='/practice'>Practice</Link></li>
                </>
              ) : (
                <>
                  <li><Link to='/'>Home</Link></li>
                  <li><Link to='/jobs'>Jobs</Link></li> 
                </>
              )}

              {user ? (
                <>
                  <li className="nav-item dropdowns">
                    <img src={profile.profilePhoto} className='user-pic' alt="Your Pic"/>
                    <Link to="#" className="btn btn-light dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                      {fullName}
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-dark">
                      
                        <li><Link className="dropdown-item" to="/dashboard">Dashboard</Link></li>
                      
                      <li><Link onClick={handlelogout} className="dropdown-item" to="/">LogOut</Link></li>
                    </ul>
                  </li>
                </>
              ) : (
                <>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to='/register'>Register</Link></li>
                </>
              )}
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

