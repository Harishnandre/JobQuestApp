import React, { useState } from 'react';
import './index.css'
import { useNavigate } from 'react-router-dom';
const UpdateJobs= () => {
  const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        website: '',
     
        preference1: '',
        preference2: '',
        preference3: '',
        logo: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            logo: e.target.files[0]
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log("Form Submitted", formData);
    };

    return (
        <div className="form-container">
          <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
            <h2>Update Jobs</h2>
            <form onSubmit={handleSubmit} className="company-form">
                <label>
                    Company Name:
                    <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        required 
                    />
                </label>
                
                <label>
                    Description:
                    <textarea 
                        name="description" 
                        value={formData.description} 
                        onChange={handleChange} 
                        rows="4"
                        required 
                    />
                </label>
                
                <label>
                    Website Link:
                    <input 
                        type="url" 
                        name="website" 
                        value={formData.website} 
                        onChange={handleChange} 
                        required 
                    />
                </label>

                <label>
                    Location:
                <div className="preferences">
                   
                    <input 
                        type="text" 
                        name="preference1" 
                        value={formData.preference1} 
                        placeholder="Preference 1"
                        onChange={handleChange} 
                    />
                
                </div>
                </label>
                
                <label>
                    Company Logo:
                    <input 
                        type="file" 
                        name="logo" 
                        onChange={handleFileChange} 
                        accept="image/*"
                        required 
                    />
                </label>

                <button type="submit"  onClick={()=>navigate('/admin/jobs')} className="submit-btn">Update Jobs</button>
            </form>
        </div>
    );
};

export default UpdateJobs;