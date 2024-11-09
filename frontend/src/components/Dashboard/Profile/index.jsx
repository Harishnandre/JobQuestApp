import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios'; // Make sure axios is imported
import './index.css';
import { Authcontext } from '../../ContextAPI/Authcontext';

const Profile = () => {
  const [auth] = useContext(Authcontext); // Destructure only the needed auth object
  const { user } = auth || {}; // Handle case where auth might be undefined
  const [resumeUrl, setResumeUrl] = useState('');

  const { 
    fullName = "Please provide data", 
    gender = "Please provide data", 
    email = "Please provide data", 
    phoneNumber = "Please provide data", 
    profile = {}, // Default to an empty object to avoid destructuring error
    address = "Please provide data", 
    role = "Please provide data" ,
  } = user || {}; // Fallback to an empty object if user is undefined
  
  const { bio = "Please provide data", profilePhoto = 'default-image.jpg', resume, resumeOriginalName,preferredJobRole } = profile || {}; // Default values for profile properties
  const Displaybio = bio === "" ? "Please provide data" : bio;
  const {role1,role2,role3} = preferredJobRole || {}
  const preferredJobRoleDisplay = preferredJobRole == null ? "Please provide data" : `${role1}, ${role2}, ${role3}`
  // Use effect to fetch the resume when component is mounted
  useEffect(() => {
    if (resume) {
      axios
        .get(resume, { responseType: "blob" })
        .then((response) => {
          const url = URL.createObjectURL(response.data);
          setResumeUrl(url); // Set the generated URL to state
        })
        .catch((error) => {
          console.error("Error loading PDF:", error.message);
        });
    }
  }, [resume]); // Only re-run when 'resume' URL changes

  return (
    <div className="profile-container">
      <h2 className="profile-title">Profile</h2>
      <p className="profile-item"><strong>Full Name: </strong> {fullName}</p>
      <p className="profile-item"><strong>Gender: </strong> {gender}</p>
      <p className="profile-item"><strong>Email:</strong> {email}</p>
      <p className="profile-item"><strong>Phone Number: </strong> {phoneNumber}</p>
      <p className='profile-item'><strong>Role: </strong>{role}</p>
      <p className="profile-item"><strong>Address: </strong> {address}</p>
   
      {role === "Job-Seeker" && (
        <div>
           <p className="profile-item"><strong>Preferred Job Roles: </strong> {preferredJobRoleDisplay}</p>
          <p className="profile-item"><strong>Bio: </strong> {Displaybio}</p>
          <p className="profile-item">
            <strong>Resume: </strong>
            {resumeUrl ? (
              <a href={resumeUrl} download={resumeOriginalName} target='_blank' rel="noopener noreferrer">
                {resumeOriginalName}
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
