import React, { useContext, useEffect, useState } from 'react';
import './index.css'
import { useNavigate, useParams } from 'react-router-dom';
import { Companycontext } from '../ContextAPI/Companycontext';
import { Authcontext } from '../ContextAPI/Authcontext';
import axios from 'axios';
import { toast } from 'react-toastify';
const UpdateCompany= () => {
    const {companyData,getAllCompany}=useContext(Companycontext) ;
    const [auth]=useContext(Authcontext); 
    const {token}=auth;
    const navigate = useNavigate();
    const {id}=useParams();
    const company = companyData.find(item =>item._id === id);
    const [formData, setFormData] = useState({
        name: company ? company.name : '',
        description: company ? company.description : '',
        website: company ? company.website : '',
        location: company ? company.location.join(", ") : '',
        logo: null
      });
      console.log(company.location,formData.location);
      // Update `formData` state when `company` changes (in case data is loaded asynchronously)
    //   useEffect(() => {
    //     if (company) {
    //       setFormData({
    //         name: company.name,
    //         description: company.description,
    //         website: company.website,
    //         location: company.location,
    //         logo: null // You might set a default image URL here, if available
    //       });
    //     }
    //   }, [company]);
    

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

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(formData);
        try {
            console.log(formData);
            const res = await axios.put(`http://localhost:5000/api/v1/company/update/${id}`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}` // Add the token here
                }
            });
            if (res?.data?.success) {
                toast.success(res.data.message);
                getAllCompany();
                navigate('/admin/companies'); // Redirect only after successful submission
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error("Error during registering Company:", error);
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Company Registration failed. Please try again later.");
            }
        }
    };

    return (
        <div className="form-container">
          <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
            <h2>Update Company</h2>
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
                        value={formData.location} 
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

                <button type="submit" className="submit-btn">Update Company</button>
            </form>
        </div>
    );
};

export default UpdateCompany;
