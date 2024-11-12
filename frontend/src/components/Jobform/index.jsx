import React, { useContext, useState } from 'react';
import './index.css';
import { useNavigate,Navigate } from 'react-router-dom';
import { Companycontext } from '../ContextAPI/Companycontext';
import { Jobcontext } from '../ContextAPI/Jobcontext';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { Authcontext } from '../ContextAPI/Authcontext';
const employmentTypes = [ "Full Time", "Intern", 
    "Part Time", "Freelance"
];
const Jobform = () => {
    const storedData = JSON.parse(localStorage.getItem("auth"));
    if(!storedData){
         alert("Please Login")
        return  <Navigate to='/login' replace/>
    }
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [requirements, setRequirements] = useState("");
    const [salary, setSalary] = useState("");
    const [location, setLocation] = useState("");
    const [jobType, setJobtype] = useState("");
    const [experience, setExperience] = useState("");
    const [vacancies, setVacancies] = useState(""); 
    const [company, setCompany] = useState(""); 
    const [jobLastDate, setJobLastDate] = useState(""); // New state for job last date
    const { companyData } = useContext(Companycontext);
    const { getAllRecruiterJobs } = useContext(Jobcontext);
    const [auth] = useContext(Authcontext);
    const { token } = auth;

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        const formData = {
            title,
            description,
            requirements,
            salary,
            location,
            jobType,
            experience,
            vacancies,
            company,
            jobLastDate // Include jobLastDate in form data
        };
        console.log("Form Submitted", formData);
        try {
            const res = await axios.post('http://localhost:5000/api/v1/job/create', formData, {
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${token}` // Add the token here
                }
            });
            if (res?.data?.success) {
                toast.success(res.data.message);
                getAllRecruiterJobs();
                setTimeout(() => {
                    navigate('/admin/jobs');
                }, 1000);// Redirect only after successful submission
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error("Error during registering new Job:", error);
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Job Registration failed. Please try again later.");
            }
        }
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
    <select 
        value={jobType} 
        onChange={(e) => setJobtype(e.target.value)} 
        required
    >
        <option value="">Select Job Type</option>
        {employmentTypes.map((type, index) => (
            <option key={index} value={type}>
                {type}
            </option>
        ))}
    </select>
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
                        onChange={(e) => setVacancies(e.target.value)} 
                        required 
                    />
                </label>

                <label>
                    Company Name
                    <select value={company} onChange={(e) => setCompany(e.target.value)}>
                        <option value="">Select Company</option>
                        {companyData.map((company) => (
                            <option key={company._id} value={company._id}>{company.name}</option>
                        ))}
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

                <label>
                    Last Application Date:
                    <input
                        type="datetime-local"
                        value={jobLastDate ? new Date(jobLastDate).toISOString().slice(0, 16) : ''} 
                        onChange={(e) => setJobLastDate(e.target.value)}
                        required
                    />
                </label>

                <button type="submit" className="submit-btn">Create Job</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Jobform;
