// import React, { useContext } from 'react';
// import './index.css';
// import { Link } from 'react-router-dom';
// import { Authcontext } from '../ContextAPI/Authcontext';

// const Navbar = () => {
//   const [auth, setauth, isLoggedIn, setisLoggedIn] = useContext(Authcontext);
//   const { user } = auth;
//   const { role, fullName, profile } = user || {};

//   const handleLogout = () => {
//     setauth({
//       ...auth,
//       user: null,
//       token: "",
//     });
//     setisLoggedIn(false);
//     localStorage.removeItem('auth');
//   };

//   return (
//     <div className="navbar">
//       <div className="box1">
//         <h1 className="logo">
//           <img src="/businessman.png" alt="Logo" className="logo-img" /> Job <span className="highlight">Quest</span>
//         </h1>
//         <div className="box2">
//           <ul className="box21">
//             <div className="change">
//               {/* Conditional rendering based on role */}
//               {role === "Recruiter" ? (
//                 <>
//                   <li ><Link className='nav-link' style={{color:'#001a33',textDecoration:'none',fontSize:'larger'}} to="/admin/companies">Companies</Link></li>
//                   <li ><Link className='nav-link' style={{color:'#001a33',textDecoration:'none',fontSize:'larger'}} to="/admin/jobs">Jobs</Link></li>
//                 </>
//               ) : role === "Job-Seeker" ? (
//                 <>
//                   <li ><Link className='nav-link' style={{color:'#001a33',textDecoration:'none',fontSize:'larger'}} to="/">Home</Link></li>
//                   <li ><Link className='nav-link' style={{color:'#001a33',textDecoration:'none',fontSize:'larger'}} to="/jobs">Jobs</Link></li>
//                   <li ><Link className='nav-link' style={{color:'#001a33',textDecoration:'none',fontSize:'larger'}} to="/practice">Practice</Link></li>
//                 </>
//               ) : (
//                 <>
//                   <li ><Link className='nav-link' style={{color:'#001a33',textDecoration:'none',fontSize:'larger'}} to="/">Home</Link></li>
//                   <li ><Link className='nav-link' style={{color:'#001a33',textDecoration:'none',fontSize:'larger'}} to="/jobs">Jobs</Link></li>
//                 </>
//               )}

//               {/* If user is logged in, display profile */}
//               {user ? (
//                 <>
//                   {/* Profile photo and name */}
//                   <li className="nav-item dropdown">
//                     <div className="user-profile" data-bs-toggle="dropdown" aria-expanded="false">
//                       {/* Profile photo on the left and name on the right */}
//                       <img src={profile?.profilePhoto || "/default-profile.png"} className="user-pic" alt="User Pic" />
//                       <div className="user-name" style={{color:'#001a33',fontSize:'larger'}}>{fullName}</div>
//                     </div>
//                     {/* Dropdown menu */}
//                     <ul className="dropdown-menu dropdown-menu-dark">
//                       <li><Link  style={{color:'#001a33',textDecoration:'none',fontSize:'larger'}} className="dropdown-item" to="/dashboard">Dashboard</Link></li>
//                       <li><Link style={{color:'#001a33',textDecoration:'none',fontSize:'larger'}} className="dropdown-item" onClick={handleLogout} to="/">LogOut</Link></li>
//                     </ul>
//                   </li>
//                 </>
//               ) : (
//                 <>
//                   <li ><Link className='nav-link' style={{color:'#001a33',textDecoration:'none',fontSize:'larger'}} to="/login">Login</Link></li>
//                   <li ><Link className='nav-link' style={{color:'#001a33',textDecoration:'none',fontSize:'larger'}} to="/register">Register</Link></li>
//                 </>
//               )}
//             </div>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;


import React, { useContext, useState } from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import { Authcontext } from '../ContextAPI/Authcontext';

const Navbar = () => {
  const [auth, setauth, isLoggedIn, setisLoggedIn] = useContext(Authcontext);
  const { user } = auth;
  const { role, fullName, profile } = user || {};

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);  // State to manage dropdown visibility

  const handleLogout = () => {
    setauth({
      ...auth,
      user: null,
      token: "",
    });
    setisLoggedIn(false);
    localStorage.removeItem('auth');
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="navbar">
      <div className="box1">
        <h1 className="logo">
          <img src="/businessman.png" alt="Logo" className="logo-img" /> Job <span className="highlight">Quest</span>
        </h1>
        <div className="box2">
          <ul className="box21">
            <div className="change">
              {/* Conditional rendering based on role */}
              {role === "Recruiter" ? (
                <>
                  <li className="nav-div"><Link className='nav-link' style={{color:'#001a33',textDecoration:'none',fontSize:'larger'}} to="/admin/companies">Companies</Link></li>
                  <li className="nav-div"><Link className='nav-link' style={{color:'#001a33',textDecoration:'none',fontSize:'larger'}} to="/admin/jobs">Jobs</Link></li>
                </>
              ) : role === "Job-Seeker" ? (
                <>
                  <li className="nav-div"><Link className='nav-link' style={{color:'#001a33',textDecoration:'none',fontSize:'larger'}} to="/">Home</Link></li>
                  <li className="nav-div"><Link className='nav-link' style={{color:'#001a33',textDecoration:'none',fontSize:'larger'}} to="/jobs">Jobs</Link></li>
                  <li className="nav-div"><Link className='nav-link' style={{color:'#001a33',textDecoration:'none',fontSize:'larger'}} to="/practice">Practice</Link></li>
                </>
              ) : (
                <>
                  <li className="nav-div"><Link className='nav-link' style={{color:'#001a33',textDecoration:'none',fontSize:'larger'}} to="/">Home</Link></li>
                  <li className="nav-div"><Link className='nav-link' style={{color:'#001a33',textDecoration:'none',fontSize:'larger'}} to="/jobs">Jobs</Link></li>
                </>
              )}

              {/* If user is logged in, display profile */}
              {user ? (
                <>
                  {/* Profile photo and name */}
                  <li className="nav-item">
                    <div className="user-profile" onClick={toggleDropdown}>
                      {/* Profile photo on the left and name on the right */}
                      <img src={profile?.profilePhoto || "/default-profile.png"} className="user-pic" alt="User Pic" />
                      <div className="user-name" style={{color:'#001a33',fontSize:'larger'}}>{fullName}</div>
                    </div>
                    
                    {/* Dropdown menu, visible based on state */}
                    {isDropdownOpen && (
                      <ul className="custom-dropdown">
                        <li><Link style={{color:'#001a33',textDecoration:'none',fontSize:'larger'}} className="dropdown-item" to="/dashboard">Dashboard</Link></li>
                        <li><Link style={{color:'#001a33',textDecoration:'none',fontSize:'larger'}} className="dropdown-item" onClick={handleLogout} to="/">LogOut</Link></li>
                      </ul>
                    )}
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-div"><Link className='nav-link' style={{color:'#001a33',textDecoration:'none',fontSize:'larger'}} to="/login">Login</Link></li>
                  <li className="nav-div"><Link className='nav-link' style={{color:'#001a33',textDecoration:'none',fontSize:'larger'}} to="/register">Register</Link></li>
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
