// UpdateProfile.js
import React, { useState } from 'react';
import './index.css'
const initialData = {
  fullname: "John Doe",
  gender: "Male",
  email: "johndoe@example.com",
  phoneNumber: "123-456-7890",
  bio: "A software engineer with a passion for developing innovative programs.",
  skills: ["JavaScript", "React", "CSS", "HTML"],
  resume: "https://example.com/resume.pdf", // replace with an actual link if available
  address: "123 Main St, Anytown, USA"
};

const UpdateProfile = () => {
   return <h1>Update Profile</h1>
};

export default UpdateProfile;
