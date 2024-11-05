
import './index.css';
import { FaBookmark, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
    const navigate = useNavigate();

    const handleDetailsClick = () => {
        navigate(`/job-details/${job._id}`);
    };

    return (
        <div key={job._id} className="job-card">
            {/* Company Info */}
            <div className="company-info">
                <h1 className="company-name">{job.company.name}</h1>
                <FaBookmark className="bookmark-icon" />
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
                    <span className="badge purple">${job.salary}</span>
                </div>
                <button className="details-button" onClick={handleDetailsClick}>Details</button>
            </div>
        </div>
    );
};

export default JobCard;
