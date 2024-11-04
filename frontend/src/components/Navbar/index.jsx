import React, { useContext } from 'react';
import './index.css';
import {Link} from 'react-router-dom'
 import { Authcontext } from '../ContextAPI/AuthContext';
 
const Navbar = () => {
   let [auth,setauth,isLoggedIn,setisLoggedIn]=useContext(Authcontext);
   console.log(auth.user);
   let handlelogout=()=>{
    setauth({
      ...auth,user:null,token:""
    });
    setisLoggedIn(false)
    localStorage.removeItem('auth');
   }
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
            {!auth.user?<>
              <li> <Link to="/login">Login</Link> </li>
              <li><Link to='/register'>Register</Link></li> 
            
                     
         {isLoggedIn && <li><Link to='/dashboard'>Dashboard</Link></li> }
            </>
            :
            <>
              <li class="nav-item dropdown">
                      <Link href="#"  class="btn btn-light dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        {auth?.user?.name}
                      </Link>
                      <ul className="dropdown-menu dropdown-menu-dark">
                        <li><Link className="dropdown-item" to={`/dashboard/${auth?.user?.role===1?"admin":""}`}>Dashboard</Link></li>
                        <li><Link onClick={handlelogout} className="dropdown-item" to="/">LogOut</Link></li>
                      </ul>
                    </li>
            
            
            
            </>
          }

            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;


