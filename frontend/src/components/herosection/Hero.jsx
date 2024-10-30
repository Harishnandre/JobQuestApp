import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <div className="heroContainer">
      <div className="content">
        <h1 className="heading">
          Find Your <span className="highlightText">Dream Job</span>
        </h1>
        <p className="subtitle">
          Browse thousands of job openings from top companies around the world
        </p>

        <div className="searchContainer">
          <input 
            type="text" 
            placeholder="Search jobs, titles, or keywords..." 
            className="searchInput"
          />
          <div className="searchIconContainer">
            🔍
          </div>
        </div>

        <div className="ctaContainer">
          <button className="ctaButton">Post a Job</button>
          <button className="ctaButton">Browse Jobs</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;



