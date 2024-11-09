import React, { useContext, useState } from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';
import { Companycontext } from '../ContextAPI/Companycontext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Authcontext } from '../ContextAPI/Authcontext';

const CompanyList = () => {
    const { getAllcompany } = useContext(Companycontext);
    const [auth]=useContext(Authcontext);
    const {token}=auth;
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        website: '',
        location: '',
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // console.log(formData);
            const res = await axios.post('http://localhost:5000/api/v1/company/create', formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}` // Add the token here
                }
            });
            if (res?.data?.success) {
                toast.success(res.data.message);
                getAllcompany();
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
            <h2>Create New Company</h2>
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
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        placeholder="Location"
                        onChange={handleChange}
                        required
                    />
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

                <button type="submit" className="submit-btn">Create Company</button>
            </form>
        </div>
    );
};

export default CompanyList;

