import React, { useState } from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const [searchValue,setSearchValue] = useState('');
  const navigate = useNavigate();

  const handleSearch = (event) => {
      setSearchValue(event.target.value)
  };
  const onClickSearch = ()=>{
       navigate(`/jobs-search/${searchValue}`)
  }

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
            placeholder="Search by job title, company, or description" 
            className="searchInput"
            onChange={handleSearch} // Trigger handleSearch on input change
          />
          <button className="searchIconContainer" onClick={onClickSearch}>
            🔍
          </button>
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



