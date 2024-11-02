// UpdateProfile.js
import React, { useState, useEffect } from 'react';
import './index.css';

const UpdateProfile = (props) => { 
  const { user } = props;
  const { fullName, gender, email, phoneNumber, profile, resume, address, role } = user;
  const { bio, profilePhoto } = profile;

  // Initialize formData from user prop
  const [formData, setFormData] = useState({
    fullName: fullName || '',
    gender: gender || '',
    email: email || '',
    phoneNumber: phoneNumber || '',
    resume: resume || null,
    address: address || '',
    bio: bio || '',
    profilePhoto: profilePhoto || '',
  });

  // Update formData if user prop changes
  useEffect(() => {
    setFormData({
      fullName: fullName || '',
      gender: gender || '',
      email: email || '',
      phoneNumber: phoneNumber || '',
      resume: resume || null,
      address: address || '',
      bio: bio || '',
      profilePhoto: profilePhoto || ''
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      resume: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated profile data:", formData);
    // Logic for submitting data to the server or handling updates can go here
  };

  return (
    <div className="update-profile-container">
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input
            type="text"
            name="fullName" // Change name to match state
            value={formData.fullName}
            onChange={handleChange}
          />
        </label>
        <label>
          Gender:
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Phone Number:
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </label>
        <label>
          Bio:
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
          />
        </label>
        <label>
          Skills (comma-separated):
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
          />
        </label>
        <label>
          Resume (PDF):
          <input
            type="file"
            name="resume"
            accept=".pdf"
            onChange={handleFileChange}
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
