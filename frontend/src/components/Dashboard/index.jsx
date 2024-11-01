import React, { useState } from 'react';
import Profile from './Profile';
import UpdateProfile from './UpdateProfile';
import UpdatePassword from './UpdatePassword';
import MyApplicants from './MyApplicants';
import './index.css';

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState('Profile'); // State to track active component

  const user = {
    name: 'Nandre Harish',
    imageUrl: 'https://static.vecteezy.com/system/resources/previews/020/911/740/original/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png', // Replace with actual user image URL
  };
  
  const handleLogout = () => {
    // Perform logout operation
    console.log('User logged out');
    // You might want to redirect or clear user state here
  };
  // Function to render the selected component
  const renderComponent = () => {
    switch (activeComponent) {
      case 'Profile':
        return <Profile />;
      case 'Update Profile':
        return <UpdateProfile />;
      case 'Update Password':
        return <UpdatePassword />;
      case 'My Applicants':
        return <MyApplicants />;
      default:
        return <Profile />;
    }
  };

  return (
    <div className="dashboard">
      {/* Header Section */}
      <header className="dashboard-header">
        <div className="user-info">
          <img src={user.imageUrl} alt="User" className="user-image" />
          <h2>Hi {user.name}!</h2>
        </div>
      </header>

      {/* Sidebar and Main Content Section */}
      <div className="dashboard-content">
        {/* Sidebar Navigation */}
        <nav className="sidebar">
          <ul>
            <li onClick={() => setActiveComponent('Profile')}>Profile</li>
            <li onClick={() => setActiveComponent('Update Profile')}>Update Profile</li>
            <li onClick={() => setActiveComponent('Update Password')}>Update Password</li>
            <li onClick={() => setActiveComponent('My Applicants')}>My Applicants</li>
            <li onClick={handleLogout} className="logout-btn">Logout</li>
          </ul>
        </nav>

        {/* Main Content Area */}
        <main className="main-content">
          {renderComponent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
