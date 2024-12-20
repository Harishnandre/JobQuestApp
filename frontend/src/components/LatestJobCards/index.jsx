import React from 'react';
// import { useNavigate } from 'react-router-dom';
import './index.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();
    const handleDetailsClick = () => {
        console.log("mnnmn")
        navigate(`/job-details/${job.id}`);
    };
    return (
         
        <div onClick={handleDetailsClick}   className='job-card'>
            <div className='company-info'>
                <h1 className='company-name'>{job?.company?.name}</h1>
            </div>
            <p className='location'>India</p>
            <div className='job-info'>
                <h1 className='job-title'>{job?.title}</h1>
                <p className='job-description'>{job?.description}</p>
            </div>
            <div className='badges-container'>
                <span className='badge blue'>{job?.position} Positions</span>
                <span className='badge orange'>{job?.jobType}</span>
                <span className='badge purple'>{job?.salary} LPA</span>
            </div>
        </div>

    );
};

export default LatestJobCards;
