import React, { useContext, useState } from 'react';
import './index.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Authcontext } from './../ContextAPI/Authcontext';
import axios from 'axios';

const Hero = () => {
  const [searchValue,setSearchValue] = useState('');
  const [auth, setauth]=useContext(Authcontext);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [loading,setloading]=useState(false);
  const [error,setError]=useState('');
  
  const navigate = useNavigate();
  const {token,user}=auth;
  const {_id} = user || {}
  const handleSearch = (event) => {
      setSearchValue(event.target.value)
  };
  // //const {id}=useParams();
  // console.log(id);
  const fetchRecommendedJobs=async()=>{
  setloading(true);
  try{
    const response=await axios.patch('http://localhost:5000/api/v1/user/get-recommended-jobs',{id:_id,token:token},{withCredentials: true});//
    console.log(response.data.jobs)
    setRecommendedJobs(response.data.jobs);

    setloading(false);
    navigate(`/recommended-jobs`);
  }
  catch(error){
   setError('Failed to fetch recommended jobs');
   setloading(false);
    console.log(error);
    console.log("no");

  }
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
            placeholder="Search by job title or description" 
            className="searchInput"
            onChange={handleSearch} // Trigger handleSearch on input change
          />
          <button className="searchIconContainer" onClick={onClickSearch}>
            🔍
          </button>
        </div>

        <div className="ctaContainer">
          <button className="ctaButton">Post a Job</button>
          <button className="ctaButton" onClick={fetchRecommendedJobs}> {loading?'Loading...':'Browse Jobs'}</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;



