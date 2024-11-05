
import './index.css';
import { FaBookmark, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState,useContext,useEffect } from 'react';
import { toast } from 'react-toastify';
import { Authcontext } from '../ContextAPI/AuthContext';
import axios from 'axios';

const JobCard = ({ job }) => {
    const navigate = useNavigate();
    const [auth, setAuth] = useContext(Authcontext);
  const { user, token } = auth
  const {_id } = user || {}
    const [isBookmarked, setIsBookmarked] = useState(false); // State for bookmark
    useEffect(() => {
        if (user?.profile?.bookmarkJob.includes(job._id)) {
            setIsBookmarked(true);
        }
    }, [user, job._id]);
    const handleDetailsClick = () => {
        navigate(`/job-details/${job._id}`);
    };

    const handleBookmarkClick =async() => {
        try {
            const url = isBookmarked 
                ? `http://localhost:5000/api/v1/user/unbookmark/${job._id}` 
                : `http://localhost:5000/api/v1/user/bookmark/${job._id}`;
                
            const method = isBookmarked ? 'PATCH' : 'POST';
            const response = await axios({
                method: method,
                url: url,
                 headers : {
                     id : _id 
                 }
            });

            if (response.data.success) {
                setIsBookmarked(!isBookmarked); // Toggle bookmark state
                const message = isBookmarked ? "Job unbookmarked successfully!" : "Job bookmarked successfully!";
                toast.success(message); // Show success toast
            }
        } catch (error) {
            toast.error("Error bookmarking job: " + error.response?.data?.message || "Server error"); // Show error toast
            console.error("Error bookmarking job:", error);
        }
    };

    return (
        <div key={job._id} className="job-card">
            {/* Company Info */}
            <div className="company-info">
                <h1 className="company-name">{job.company.name}</h1>
                <FaBookmark 
                    className={`bookmark-icon ${isBookmarked ? 'bookmarked' : ''}`} 
                    onClick={handleBookmarkClick} // Add click handler
                />
            </div>

            {/* Location */}
            <p className="location">
                <FaMapMarkerAlt className="location-icon" /> 
                {Array.isArray(job.location) ? job.location.join(', ') : job.location}
            </p>

            {/* Job Info */}
            <div className="job-info">
                <h1 className="job-title">{job.title}</h1>
                <p className="job-description">{job.description}</p>
            </div>

            {/* Badges and Details Button */}
            <div className="alignment">
                <div className="badges-container">
                    <span className="badge blue">{job.vacancies} Positions</span>
                    <span className="badge orange">{job.jobType}</span>
                    <span className="badge purple">{job.salary} LPA</span>
                </div>
                <button className="details-button" onClick={handleDetailsClick}>Details</button>
            </div>
        </div>
    );
};

export default JobCard;
