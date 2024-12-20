import React, { useState, useEffect, useContext } from 'react';
import './index.css';
import { Authcontext } from '../../ContextAPI/Authcontext';
import axios from 'axios';
import { toast } from 'react-toastify';
import JobQuestLoader from '../../Loader';

const UpdateProfile = () => {
  const [auth, setAuth] = useContext(Authcontext);
  const { user, token } = auth || {};

  const { fullName, email, phoneNumber, profile, address, _id, role } = user || {};
  const { role1, role2, role3 } = profile?.preferredJobRole || {};
  const { bio, resume, resumeOriginalName, profilePhoto } = profile || {};

  const [formData, setFormData] = useState({
    fullName: fullName || '',
    email: email || '',
    phoneNumber: phoneNumber || '',
    resume: resume || '',  // Expecting a URL for the resume
    address: address || '',
    bio: bio || '',
    role1: role1 || '',
    role2: role2 || '',
    role3: role3 || '',
    resumeOriginalName: resumeOriginalName || '',
    profilePhoto: profilePhoto || '',
  });

  const [loading, setLoading] = useState(false);  // Loading state for showing the loader

  useEffect(() => {
    setFormData({
      fullName: fullName || '',
      email: email || '',
      phoneNumber: phoneNumber || '',
      resume: resume || '',
      address: address || '',
      bio: bio || '',
      role1: role1 || '',
      role2: role2 || '',
      role3: role3 || '',
      resumeOriginalName: resumeOriginalName || '',
      profilePhoto: profilePhoto || '',
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
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0],  // Ensure only the first file is selected
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    const form = new FormData();

    // Append form data fields to FormData object
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });
    form.append('token', token);
    form.append('id', _id);
    form.append('role', role);
    try {
      const url = 'http://localhost:5000/api/v1/user/update-profile';
      const res = await axios.post(url, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setLoading(false); // End loading

      if (res.data.success) {
        const newUpdatedUser = res.data.updateUser;
        setAuth((prevAuth) => ({
          ...prevAuth,
          user: newUpdatedUser,
        }));
        toast.success('Profile Updated Successfully');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      setLoading(false); // End loading
      console.log(error);
      toast.error(error.response?.data?.message || 'An error occurred');
    }
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
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </label>

        <label>
          Profile Photo:
          <input
            type="file"
            name="profilePhoto"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>

        {role === 'Job-Seeker' && (
          <div>
            <label>
              Bio:
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
              />
            </label>

            <label>
              Resume: (Link)
              <input
                type="url"
                name="resume"
                placeholder="Enter valid resume drive link and make sure that it is public access"
                value={formData.resume}
                onChange={handleChange}
              />
            </label>

            <div>
              <strong>Preferred Roles:</strong>
              <label>
                Role 1:
                <input
                  type="text"
                  name="role1"
                  value={formData.role1}
                  onChange={handleChange}
                />
              </label>

              <label>
                Role 2:
                <input
                  type="text"
                  name="role2"
                  value={formData.role2}
                  onChange={handleChange}
                />
              </label>

              <label>
                Role 3:
                <input
                  type="text"
                  name="role3"
                  value={formData.role3}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>

      {loading && <JobQuestLoader />}
    </div>
  );
};

export default UpdateProfile;
