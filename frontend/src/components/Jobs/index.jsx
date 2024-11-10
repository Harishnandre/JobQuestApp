import React, { useContext, useState } from 'react';
import './index.css';
import { Link, useNavigate } from 'react-router-dom';
import { Jobcontext } from '../ContextAPI/Jobcontext';
import { FaBookmark, FaMapMarkerAlt } from "react-icons/fa";
import { LuPencil } from "react-icons/lu";

const Jobs = () => {
    const { recruiterJobs } = useContext(Jobcontext);
    const navigate = useNavigate();
    
    const [dropdownVisible, setDropdownVisible] = useState(null); // Track which dropdown is open
    
    const toggleDropdown = (id) => {
        // Toggle dropdown for the specific job
        setDropdownVisible(dropdownVisible === id ? null : id);
    };
    
    return (
        <div>
            <div className="container">
                <div className="header">
                    <input
                        type="text"
                        className="filter-input"
                        placeholder="Filter by name"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button className="new-company-btn" onClick={() => navigate("/admin/jobs/createjob")}>
                        New Jobs
                    </button>
                </div>

                <div className="job-item-content">
                    {recruiterJobs.map((job) => (
                        <div key={job._id} className="job-inner-content">
                            <div className="company-header">
                                <div>
                                    <img src={job.company.logo} alt="Company Logo" className="company-logo" />
                                    <h4>{job.company.name}</h4>
                                </div>
                                <div className="edit-icon" onClick={() => toggleDropdown(job._id)} title="Options">
                                    <LuPencil />
                                </div>
                                {/* Dropdown menu */}
                                {dropdownVisible === job._id && (
                                    <div className="dropdown-menu">
                                        <Link to={`/admin/jobs/updatejob/${job._id}`} className="dropdown-item">Edit</Link>
                                        <Link to={`/admin/jobs/applicants/${job._id}`} className="dropdown-item">Applicants</Link>
                                    </div>
                                )}
                            </div>
                            <div className="job-detail">
                                <h4 className="job-title">{job.title}</h4>
                                <div className='job_box'>
                                    <div className="job-description"><span style={{ fontWeight: 'bold' }}>Job Description:</span> {job.description}</div>
                                    <div className="job-requirements">
                                        <span style={{ fontWeight: 'bold' }}>Requirements:</span>
                                        {job.requirements?.map((r) => (
                                            <li key={r}>{r}</li>
                                        ))}
                                    </div>
                                    <div className="job-experience"><span style={{ fontWeight:'bold' }}>Experience:</span> {job.experience}</div>
                                    <div className="job-location" style={{ fontWeight: 'bold' }}>
                                        <FaMapMarkerAlt className="location-icon" /> 
                                        <span>{job.location}</span>
                                    </div>
                                    <div className="badges-container">
                                        <span className="badge blue">{job.vacancies} Positions</span>
                                        <span className="badge orange">{job.jobType}</span>
                                        <span className="badge purple">{job.salary} LPA</span>
                                    </div> 
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Jobs;
