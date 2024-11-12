import React, { useContext, useEffect, useState } from 'react';
import './index.css';
import { useNavigate, useParams ,Navigate} from 'react-router-dom';
import { Jobcontext } from '../ContextAPI/Jobcontext';
import { Companycontext } from '../ContextAPI/Companycontext';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { Authcontext } from '../ContextAPI/Authcontext';
const employmentTypes = [
    "Full Time", "Intern", 
    "Part Time", "Freelance"
];

const UpdateJobs = () => {
    const storedData = JSON.parse(localStorage.getItem("auth"));
    if(!storedData){
         alert("Please Login")
        return  <Navigate to='/login' replace/>
    }
    const { recruiterJobs, getAllRecruiterJobs } = useContext(Jobcontext);
    const { companyData } = useContext(Companycontext);
    const [auth] = useContext(Authcontext);
    const { token } = auth;
    const navigate = useNavigate();
    const { id } = useParams();
    
    const [job, setJob] = useState(null); // State to hold the job data
    const [loading, setLoading] = useState(true); // State to track loading status

    // Form state
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [requirements, setRequirements] = useState('');
    const [salary, setSalary] = useState('');
    const [location, setLocation] = useState('');
    const [jobType, setJobtype] = useState('');
    const [experience, setExperience] = useState('');
    const [vacancies, setVacancies] = useState('');
    const [company, setCompany] = useState('');
    const [jobLastDate,setJobLastDate] = useState('')

    useEffect(() => {
        const jobData = recruiterJobs.find(job => job._id === id);
        if (jobData) {
            // Set the job state with values from `jobData`
            setJob(jobData);
            setTitle(jobData.title);
            setDescription(jobData.description);
            setRequirements(jobData.requirements.join(",")); // Convert array to string
            setSalary(jobData.salary);
            setLocation(jobData.location);
            setJobtype(jobData.jobType);
            setExperience(jobData.experience);
            setVacancies(jobData.vacancies);
            setCompany(jobData.company._id);
            setJobLastDate(jobData.jobLastDate)
            setLoading(false);
        } else {
            // If the job is not found immediately, set loading to false and navigate back or show an error
            setLoading(false);
        }
    }, [recruiterJobs, id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            title,
            description,
            requirements,// Convert requirements back to an array
            salary,
            location,
            jobType,
            experience,
            vacancies,
            company,
            jobLastDate
        };
        try {
            const res = await axios.patch(`http://localhost:5000/api/v1/job/update/${id}`, formData, {
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res?.data?.success) {
                toast.success(res.data.message);
                getAllRecruiterJobs();
                setTimeout(() => navigate('/admin/jobs'), 2000); // Delay before navigating
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error("Error during updating Job:", error);
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Job Updation failed. Please try again later.");
            }
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="form-container">
            <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
            <h2>Update Job</h2>
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
                    Select Company
                    <select value={company} onChange={(e) => setCompany(e.target.value)} required>
                        <option value="">Select Company</option>
                        {companyData.map(company => (
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
                <button type="submit" className="submit-btn">Update Job</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default UpdateJobs;
