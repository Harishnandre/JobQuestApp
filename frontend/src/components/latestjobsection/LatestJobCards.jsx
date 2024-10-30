import React from 'react';
// import { useNavigate } from 'react-router-dom';
import './LatestJobCards.css'; // Import the CSS file

const LatestJobCards = ({ job }) => {
    
    return (
     
        <div className='job-card'>
            <div className='company-info'>
                <h1 className='company-name'>{job?.company?.name}</h1>
                <p className='location'>India</p>
            </div>
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
