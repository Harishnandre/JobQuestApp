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
  const [formData, setFormData] = useState({
    fullname: initialData.fullname || "",
    gender: initialData.gender || "",
    email: initialData.email || "",
    phoneNumber: initialData.phoneNumber || "",
    bio: initialData.bio || "",
    skills: initialData.skills ? initialData.skills.join(', ') : "",
    resume: initialData.resume || null,
    address: initialData.address || "",
  });

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
            name="fullname"
            value={formData.fullname}
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
