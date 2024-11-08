import React, { useState, useEffect, useContext } from 'react';
import './index.css';
import { Authcontext } from '../../ContextAPI/Authcontext';
import axios from 'axios';
import { toast } from 'react-toastify';

const UpdateProfile = () => {
  const [auth, setAuth] = useContext(Authcontext);
  const { user ,token} = auth || {};

  const { fullName, email, phoneNumber, profile, address,_id } = user || {};
  const { role1, role2, role3 } = profile?.preferredJobRole || {};
  const { bio ,resume,profilePhoto} = profile || {};

  const [formData, setFormData] = useState({
    fullName: fullName || '',
    email: email || '',
    phoneNumber: phoneNumber || '',
    resume: resume || null,
    address: address || '',
    bio: bio || '',
    role1: role1 || '',
    role2: role2 || '',
    role3: role3 || '',
    profilePhoto: profilePhoto || null
  });

  useEffect(() => {
    setFormData({
      fullName: fullName || '',
      email: email || '',
      phoneNumber: phoneNumber || '',
      resume: resume || null,
      address: address || '',
      bio: bio || '',
      role1: role1 || '',
      role2: role2 || '',
      role3: role3 || '',
      profilePhoto: profilePhoto || null
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
      [name]: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Updated profile data:", formData);

    const updatedUser = {
      ...user,
      profile: {
        ...user.profile,
        bio: formData.bio,
        resume : formData.resume,
        profilePhoto : formData.profilePhoto,
        preferredJobRole: {
          role1: formData.role1,
          role2: formData.role2,
          role3: formData.role3
        }
      },
      fullName: formData.fullName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      address: formData.address,
    };
     try{
       const url = 'http://localhost:5000/api/v1//user/update-profile';
       const res = await axios.patch(url,{...formData,token:token,id:_id})
       if(res.data.success){
        setAuth((prevAuth) => ({
          ...prevAuth,
          user: updatedUser,
        }));
        toast.success("Profile Updated Successfully")
       }
       else{
         toast.error(res.data.message)
       }
     }
     catch(error){
        toast.error(error.response.data.message)
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

        {user.role === "Job-Seeker" && (
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
              Resume:
              <input
                type="file"
                name="resume"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
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

        <button type="submit">Update Profile</button>
      </form>

    </div>
  );
};

export default UpdateProfile;
