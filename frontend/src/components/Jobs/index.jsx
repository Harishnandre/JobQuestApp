import React, { useContext, useState } from 'react';
import './index.css';
import { Link, useNavigate } from 'react-router-dom';
import { Jobcontext } from '../ContextAPI/Jobcontext';
import { FaBookmark, FaMapMarkerAlt } from "react-icons/fa";
import { PiDotsThreeOutlineThin } from "react-icons/pi";
import { SlPencil } from "react-icons/sl";
import { IoEye } from "react-icons/io5";
import { MdDateRange } from "react-icons/md";

const Jobs = () => {
    const [keyword,setKeyword] = useState('')
    const { recruiterJobs } = useContext(Jobcontext);
    const navigate = useNavigate();
    
    const [dropdownVisible, setDropdownVisible] = useState(null); // Track which dropdown is open
    
    const toggleDropdown = (id) => {
        // Toggle dropdown for the specific job
        setDropdownVisible(dropdownVisible === id ? null : id);
    };
    const filteredJobs =  recruiterJobs.filter((eachJob)=>{
    return  eachJob.title.toLowerCase().includes(keyword.toLowerCase()) || eachJob.company.name.toLowerCase().includes(keyword.toLocaleLowerCase())
    })
    return (
        <div>
            <div className="container">
                <div className="header">
                    <input
                        type="text"
                        className="filter-input"
                        placeholder="Filter by name"
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <button className="new-company-btn" onClick={() => navigate("/admin/jobs/createjob")}>
                        New Jobs
                    </button>
                </div>

                <div className="job-item-content">

                    {filteredJobs.length > 0 ? filteredJobs.map((job) => (
                        <div key={job._id} className="job-inner-content">
                            <div className="company-header">
                                <div>
                                    <img src={job.company.logo} alt="Company Logo" className="company-logo" />
                                    <h4>{job.company.name}</h4>
                                </div>
                                <div className="edit-icon" onClick={() => toggleDropdown(job._id)} title="Options">
                                <PiDotsThreeOutlineThin size={36}/>
                                </div>
                                {/* Dropdown menu */}
                                {dropdownVisible === job._id && (
                                    <div className="dropdown-menu-job">
                                        <Link to={`/admin/jobs/updatejob/${job._id}`} className="dropdown-item-job"><span><SlPencil size={13} /></span>    Edit</Link>
                                        <Link to={`/admin/jobs/applicants/${job._id}`} className="dropdown-item-job"><span><IoEye size={16} /></span>    Applicants</Link>
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
                                    <div className="job-location" style={{ fontWeight: 'bold' }}>
                                        <MdDateRange className="location-icon" /> 
                                        <span>{new Date(job.jobLastDate).toLocaleString()}</span>
                                    </div>
                                    <div className="badges-container">
                                        <span className="badge blue">{job.vacancies} Positions</span>
                                        <span className="badge orange">{job.jobType}</span>
                                        <span className="badge purple">{job.salary} LPA</span>
                                    </div> 
                                </div>
                            </div>
                        </div>
                    ))
                : <h2>No Jobs created yet..</h2>
                }
                </div>
            </div>
        </div>
    );
}

export default Jobs;
