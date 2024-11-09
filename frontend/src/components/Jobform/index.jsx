import React, { useState } from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';

const Jobform = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [requirements, setRequirements] = useState("");
    const [salary, setSalary] = useState("");
    const [location, setLocation] = useState("");
    const [jobtype, setJobtype] = useState("");
    const [experience, setExperience] = useState("");
    const [vacancies, setvacancies] = useState(""); 
    const [company, setCompany] = useState(""); 

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            title,
            description,
            requirements,
            salary,
            location,
            jobtype,
            experience,
            vacancies,
            company
        };
        console.log("Form Submitted", formData);
        navigate('/admin/jobs');
    };

    return (
        <div className="form-container">
            <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
            <h2>Create New Job</h2>
            <form onSubmit={handleSubmit} className="company-form">
                <label>
                    Title
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        required 
                    />
                </label>
                
                <label>
                    Requirements:
                    <input 
                        type="text" 
                        value={requirements} 
                        onChange={(e) => setRequirements(e.target.value)} 
                        required 
                    />
                </label>

                <label>
                    Salary:
                    <input 
                        type="number" 
                        value={salary} 
                        onChange={(e) => setSalary(e.target.value)} 
                        required 
                    />
                </label>

                <label>
                    Location:
                    <input 
                        type="text" 
                        value={location} 
                        onChange={(e) => setLocation(e.target.value)} 
                        required 
                    />
                </label>
                
                <label>
                    Job Type
                    <input 
                        type="text" 
                        value={jobtype}
                        onChange={(e) => setJobtype(e.target.value)} 
                        required 
                    />
                </label>

                <label>
                    Experience Level
                    <input 
                        type="text" 
                        value={experience} 
                        onChange={(e) => setExperience(e.target.value)} 
                    />
                </label>

                <label>
                    No of Positions:
                    <input 
                        type="number" 
                        value={vacancies} 
                        onChange={(e) => setvacancies(e.target.value)} 
                        required 
                    />
                </label>

                <label>
                    Company Name
                    <select value={company} onChange={(e) => setCompany(e.target.value)}>
                        <option value="">Select Company</option>
                        <option value="Microsoft">Microsoft</option>
                        <option value="Facebook">Facebook</option>
                    </select>
                </label>

                <label>
                    Description:
                    <textarea 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        rows="4"
                        required 
                    />
                </label>

                <button type="submit" className="submit-btn">Create Job</button>
            </form>
        </div>
    );
};
export default Jobform
