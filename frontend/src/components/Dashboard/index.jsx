import React, { useContext, useState } from 'react';
import Profile from './Profile';
import UpdateProfile from './UpdateProfile';
import UpdatePassword from './UpdatePassword';
import Bookmarks from './Bookmarks';
import './index.css';
import { Navigate, useLocation, useNavigate  } from 'react-router-dom';
import { Authcontext  } from '../ContextAPI/Authcontext';
import MyApplications from './MyApplications';
import { ToastContainer } from 'react-toastify';
const Dashboard = () => {
  let [auth,setauth,isLoggedIn,setisLoggedIn]=useContext(Authcontext);
  const { user } = auth || {};
  console.log(user)
  if(!isLoggedIn){
    return <Navigate to='/login'/>
 }
  
  const [activeComponent, setActiveComponent] = useState('Profile'); // State to track active component
  const { profile, fullName } = user || {};
  const profilePhoto = profile?.profilePhoto || 'default-image.jpg'; // Add a default image path if needed
  
  
  const handleLogout = () => {
    console.log('User logged out');
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Profile':
        return <Profile />;
      case 'My Applications':
         return <MyApplications/>
      case 'Update Profile':
        return <UpdateProfile />;
      case 'Update Password':
        return <UpdatePassword />;
      case 'Bookmarks':
        return <Bookmarks/>
      default:
        return <Profile />;
    }
  };

  return (
    <div className="dashboard">
      {/* Header Section */}
      <header className="dashboard-header">
        <div className="user-info">
          <img src={profilePhoto} alt="User" className="user-image" />
          <h2>Hi {fullName}!</h2>
        </div>
      </header>

      {/* Sidebar and Main Content Section */}
      <div className="dashboard-content">
        {/* Sidebar Navigation */}
        <nav className="sidebar">
          <ul>
            <li
              className={activeComponent === 'Profile' ? 'active' : ''}
              onClick={() => setActiveComponent('Profile')}
            >
              Profile
            </li>
            <li
              className={activeComponent === 'Update Profile' ? 'active' : ''}
              onClick={() => setActiveComponent('Update Profile')}
            >
              Update Profile
            </li>
         { user.role === 'Job-Seeker' &&  <><li
              className={activeComponent === 'My Applicantions' ? 'active' : ''}
              onClick={() => setActiveComponent('My Applications')}
            >
              My Applications
            </li>
        
<li
              className={activeComponent === 'Bookmarks' ? 'active' : ''}
              onClick={() => setActiveComponent('Bookmarks')}>
              Bookmarks
            </li>
            </>
}
            <li
              className={activeComponent === 'Update Password' ? 'active' : ''}
              onClick={() => setActiveComponent('Update Password')}
            >
              Update Password
            </li>
            
           
          </ul>
        </nav>

        {/* Main Content Area */}
        <main className="main-content">
          {renderComponent()}
        </main>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Dashboard;
