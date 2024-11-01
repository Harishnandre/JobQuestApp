
import './index.css';
import { FaBookmark, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const JobCard = (props) => {
    const { job } = props;
    const navigate = useNavigate();

    const handleDetailsClick = () => {
        navigate(`/job-details/${job.id}`);
    };

    return (
        // <div key={job.id} className="job-card">
        //     <div className="card-header">
        //         <h4>{job.company}</h4>
        //         <FaBookmark className="bookmark-icon" />
        //     </div>
        //     <p className="location">
        //         <FaMapMarkerAlt className="location-icon" /> {job.location}
        //     </p>
        //     <p className="description">{job.description}</p>
        //     <div className="card-footer">
        //         <span>{job.role}</span>
        //         <span>{job.salary} LPA</span>
        //         <span>{job.type}</span>
        //         <span>{job.positions} positions</span>
        //     </div>
        //     <button className="details-button" onClick={handleDetailsClick}>Details</button>
        // </div>
 

 <div key={job.id} className='job-card'>
 <div className='company-info'>
     <h1 className='company-name'>{job.company}</h1>
     <FaBookmark className="bookmark-icon" />
     </div>
     <p className="location">
      <FaMapMarkerAlt className="location-icon" /> {job.location}
       </p>

 <div className='job-info'>
     <h1 className='job-title'>{job?.role}</h1>
     <p className='job-description'>{job?.description}</p>
 </div>
 <div className="alignment">
 <div className='badges-container'>
     <span className='badge blue'>{job.positions} Positions</span>
     <span className='badge orange'>{job.type}</span>
     <span className='badge purple'>{job.salary} LPA</span>
 </div>
   <button className="details-button" onClick={handleDetailsClick}>Details</button>
 </div>

</div>

    );
};

export default JobCard;

