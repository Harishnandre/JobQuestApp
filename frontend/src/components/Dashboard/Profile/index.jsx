import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
import { Authcontext } from '../../ContextAPI/Authcontext';

const Profile = () => {
  const [auth] = useContext(Authcontext);
  const { user } = auth || {};

  const { 
    fullName = "Please provide data", 
    gender = "Please provide data", 
    email = "Please provide data", 
    phoneNumber = "Please provide data", 
    profile = {}, 
    address = "Please provide data", 
    role = "Please provide data" 
  } = user || {};
  
  const { bio = "Please provide data", profilePhoto = 'default-image.jpg', resume, resumeOriginalName, preferredJobRole } = profile || {};
  const Displaybio = bio === "" ? "Please provide data" : bio;
  const { role1, role2, role3 } = preferredJobRole || {};
  const preferredJobRoleDisplay = preferredJobRole == null ? "Please provide data" : `${role1 || ""}, ${role2 || ""}, ${role3 || ""}`;


  return (
    <div className="profile-container">
      <h2 className="profile-title">Profile</h2>
      <p className="profile-item"><strong>Full Name: </strong> {fullName}</p>
      <p className="profile-item"><strong>Gender: </strong> {gender}</p>
      <p className="profile-item"><strong>Email:</strong> {email}</p>
      <p className="profile-item"><strong>Phone Number: </strong> {phoneNumber}</p>
      <p className="profile-item"><strong>Role: </strong> {role}</p>
      <p className="profile-item"><strong>Address: </strong> {address}</p>

      {role === "Job-Seeker" && (
        <div>
          <p className="profile-item"><strong>Preferred Job Roles: </strong> {preferredJobRoleDisplay}</p>
          <p className="profile-item"><strong>Bio: </strong> {Displaybio}</p>
          <p className="profile-item">
            <strong>Resume: </strong>
            {resume ? (
              <a href={`${resume}.pdf`} target="_blank" rel="noopener noreferrer">
                 View Resume
              </a>
            ) : (
              "Please provide data"
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default Profile;
