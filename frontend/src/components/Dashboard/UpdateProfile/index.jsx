import React, { useState, useEffect, useContext } from 'react';
import './index.css';
import { Authcontext } from '../../ContextAPI/AuthContext';

const UpdateProfile = () => {
  const [auth, setAuth] = useContext(Authcontext); // Get auth data and setAuth function from context
  const { user } = auth || {}; // Destructure user data from auth
  const { fullName, gender, email, phoneNumber, profile, resume, address, role } = user || {}; // Destructure user data

  const { bio, profilePhoto } = profile || {}; // Safe destructuring of profile object

  // Initialize formData state based on user data
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

  // Update formData when user data changes
  useEffect(() => {
    setFormData({
      fullName: fullName || '',
      gender: gender || '',
      email: email || '',
      phoneNumber: phoneNumber || '',
      resume: resume || null,
      address: address || '',
      bio: bio || '',
      profilePhoto: profilePhoto || '',
    });
  }, [user]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      resume: e.target.files[0],
    }));
    console.log(e.target.files[0])
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated profile data:", formData);

    // Prepare updated user data
    const updatedUser = {
      ...user,
      ...formData,
    };

    // Update context with the updated user data
    setAuth((prevAuth) => ({
      ...prevAuth,
      user: updatedUser,
    }));
  };

  return (
    <div className="update-profile-container">
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
        </label>
        
        <label>
          Gender:
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
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
        
      {role === "Job-Seeker" &&  <div>
        <label>
          Bio:
          <textarea
            name="bio"
            value={formData.bio}
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
        </div>
        }
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </label>
        
        <div className="profile-role">
          <strong>Role: </strong>{role} {/* Display-only field for role */}
        </div>
        
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
