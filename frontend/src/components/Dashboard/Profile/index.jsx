// Profile.js
import React from 'react';
import './index.css';


const Profile = (props) => {
   const {user} = props
   const {fullName,gender,email,phoneNumber,profile,resume,address,role} = user
   const {bio,profilePhoto} = profile
   console.log(user,1)
  return ( 
    <div className="profile-container">
      <h2 className="profile-title">Profile</h2>
      <p className="profile-item"><strong>Full Name:</strong> {fullName || "Please provide data"}</p>
      <p className="profile-item"><strong>Gender:</strong> {gender || "Please provide data"}</p>
      <p className="profile-item"><strong>Email:</strong> {email || "Please provide data"}</p>
      <p className="profile-item"><strong>Phone Number:</strong> {phoneNumber || "Please provide data"}</p>
      <p className="profile-item"><strong>Bio:</strong> {bio || "Please provide data"}</p>
      <p className="profile-item">
        <strong>Resume:</strong> 
        {resume ? <a href={resume} download="resume.pdf">Download Resume</a> : "Please provide data"}
      </p>
      <p className="profile-item"><strong>Address:</strong> {address || "Please provide data"}</p>
    </div>
  );
};

export default Profile;
