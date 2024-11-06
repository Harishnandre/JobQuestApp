// Profile.js
import React, { useContext } from 'react';
import './index.css';
import { Authcontext } from '../../ContextAPI/Authcontext';

const Profile = () => {
  const [auth] = useContext(Authcontext); // Destructure only the needed auth object
  const { user } = auth || {}; // Handle case where auth might be undefined
  const { 
    fullName = "Please provide data", 
    gender = "Please provide data", 
    email = "Please provide data", 
    phoneNumber = "Please provide data", 
    profile = {}, // Default to an empty object to avoid destructuring error
    resume = null, 
    address = "Please provide data", 
    role = "Please provide data" 
  } = user || {}; // Fallback to an empty object if user is undefined
  const { bio = "Please provide data", profilePhoto = 'default-image.jpg' } = profile || {} // Default values for profile properties
   const Displaybio = bio === "" ? "Please provide data" : bio
  return (
    <div className="profile-container">
      <h2 className="profile-title">Profile</h2>
      <p className="profile-item"><strong>Full Name: </strong> {fullName}</p>
      <p className="profile-item"><strong>Gender: </strong> {gender}</p>
      <p className="profile-item"><strong>Email:</strong> {email}</p>
      <p className="profile-item"><strong>Phone Number: </strong> {phoneNumber}</p>
      <p className='profile-item'><strong>Role: </strong>{role}</p>
      <p className="profile-item"><strong>Address: </strong> {address}</p>
     {role === "Job-Seeker" && <div>
      <p className="profile-item"><strong>Bio: </strong> {Displaybio}</p>
      <p className="profile-item">
        <strong>Resume: </strong> 
        {resume ? <a href={resume} download="resume.pdf">Download Resume</a> : "Please provide data"}
      </p>
      </div>
}
    </div>
  );
};

export default Profile;
