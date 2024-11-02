// Profile.js
import React from 'react';
import './index.css';

const sampleData = {
  fullname: "John Doe",
  gender: "Male",
  email: "johndoe@example.com",
  phoneNumber: "123-456-7890",
  bio: "A software engineer with a passion for developing innovative programs.",
  skills: ["JavaScript", "React", "CSS", "HTML"],
  resume: "https://example.com/resume.pdf", // replace with an actual link if available
  address: "123 Main St, Anytown, USA"
};
const Profile = () => {
   const {fullname,gender,email,phoneNumber,bio,skills,resume,address} = sampleData
  return (
    <div className="profile-container">
      <h2 className="profile-title">Profile</h2>
      <p className="profile-item"><strong>Full Name:</strong> {fullname || "Please provide data"}</p>
      <p className="profile-item"><strong>Gender:</strong> {gender || "Please provide data"}</p>
      <p className="profile-item"><strong>Email:</strong> {email || "Please provide data"}</p>
      <p className="profile-item"><strong>Phone Number:</strong> {phoneNumber || "Please provide data"}</p>
      <p className="profile-item"><strong>Bio:</strong> {bio || "Please provide data"}</p>
      <p className="profile-item"><strong>Skills:</strong> {skills && skills.length > 0 ? skills.join(', ') : "Please provide data"}</p>
      <p className="profile-item">
        <strong>Resume:</strong> 
        {resume ? <a href={resume} download="resume.pdf">Download Resume</a> : "Please provide data"}
      </p>
      <p className="profile-item"><strong>Address:</strong> {address || "Please provide data"}</p>
    </div>
  );
};

export default Profile;
