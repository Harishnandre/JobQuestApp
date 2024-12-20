
import './index.css';
import {  FaMapMarkerAlt ,FaBookmark} from "react-icons/fa";
import { CiBookmark} from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useState,useContext,useEffect } from 'react';
import { toast } from 'react-toastify';
import { Authcontext } from '../ContextAPI/Authcontext';
import axios from 'axios';
import { MdDateRange } from "react-icons/md";


const JobCard = ({ job }) => {
    const navigate = useNavigate();
    const [auth, setAuth] = useContext(Authcontext);
  const { user, token } = auth
  const {_id } = user || {}
    const [isBookmarked, setIsBookmarked] = useState(false); // State for bookmark
    useEffect(() => {
        if (user?.bookmarkJob?.some(eachJob => eachJob._id === job._id)) {
            setIsBookmarked(true);
        }

    }, [user, job._id]);
    const handleDetailsClick = () => {
        navigate(`/job-details/${job._id}`);
    };

    const handleBookmarkClick = async () => {
        try {
            const url = isBookmarked 
                ? `http://localhost:5000/api/v1/user/unbookmark/${job._id}` 
                : `http://localhost:5000/api/v1/user/bookmark/${job._id}`;
                
            const method = 'PATCH';
            const response = await axios({
                method: method,
                url: url,
                data: {
                    token: token,
                    id: _id
                }
            });
    
            if (response.data.success) {
                // Toggle bookmark state
                setIsBookmarked(!isBookmarked); 
                
                // Update bookmarkJob in context state
                const updatedBookmarkJobs = isBookmarked 
                    ? user.bookmarkJob.filter((eachJob) => eachJob._id !== job._id) // Remove bookmark by ID
                    : [...user.bookmarkJob, job]; // Add bookmark
                
                // Update the context with the new list of bookmarked jobs
                setAuth({
                    ...auth,
                    user: {
                        ...user,
                        bookmarkJob: updatedBookmarkJobs // Update bookmarkJob
                    }
                });
    
                const message = isBookmarked ? "Job unbookmarked successfully!" : "Job bookmarked successfully!";
                isBookmarked ? toast.info(message) : toast.success(message); // Show success toast
            }
        } catch (error) {
            toast.error("Error bookmarking job: " + (error.response?.data?.message || "Server error")); // Show error toast
            console.error("Error bookmarking job:", error);
        }
    };
    
    

    return (
        <div key={job._id} className="job-card">
            {/* Company Info */}
            <div className="company-info">
            <div className='job-card-user-logo'>
            <img src={job.company.logo} alt="Company Logo" className="company-logo" />
                                    <h4>{job.company.name}</h4>
                                </div>
                <FaBookmark
                    className={`bookmark-icon-1 ${isBookmarked ? 'bookmarked'  :''}`} 
                    onClick={handleBookmarkClick} // Add click handler
                />
            </div>

            {/* Location */}
            <p className="location">
                <FaMapMarkerAlt className="location-icon" /> 
                {Array.isArray(job.location) ? job.location.join(', ') : job.location}
            </p>
            <div className="job-location" style={{ fontWeight: 'bold' }}>
                                        <MdDateRange className="location-icon" /> 
                                        <span>{new Date(job.jobLastDate).toLocaleString()}</span>
                                    </div>

            {/* Job Info */}
            <div className="job-info">
                <h1 className="job-title">{job.title}</h1>
                <p className="job-description">{job.description}</p>
                {(new Date(job.jobLastDate) < new Date()) && <p className='closed'>Closed</p>}
            </div>

            {/* Badges and Details Button */}
            <div className="alignment">
                <div className="badges-container">
                    <span className="badge b-1 blue">{job.vacancies} Positions</span>
                    <span className="badge b-1 orange">{job.jobType}</span>
                    <span className="badge b-1 purple">{job.salary} LPA</span>
                </div>
                <button className="details-button" onClick={handleDetailsClick}>Details</button>
            </div>
        </div>
    );
};

export default JobCard;
