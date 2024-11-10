import React, { useState } from 'react'
import LatestJobCards from '../LatestJobCards';
import './index.css'
import { useEffect } from 'react';
import axios from 'axios';
import JobCard from '../JobCard';
// import LatestJobCards from '../LatestJobCards';
const TopNiches = () => {
 
const [alljobs,setalljobs]=useState([]);
const [error, setError] = useState(null);


const fetchJobs=async()=>{
  try {
    const response = await axios.get(`http://localhost:5000/api/v1/job/get`);
    if (response.data.success) {
      console.log("yes");
      console.log(response.data.jobs);
      console.log("yes");

      setalljobs(response.data.jobs);
    } else {
      setError("Failed to load jobs.");
    }
  } catch (error) {
    console.error("Error fetching jobs:", error);
    setError("Error fetching jobs. Please try again later.");
  } 
};
useEffect(() => {
  fetchJobs();
}, []);

  return (
    <div>
      <h1><span className='changecolor'>Latest & Top</span> Job Openings</h1>
      <div className='card-container'>
        {alljobs.length<=0?<span>No Job Available</span>:alljobs?.slice(0,6).map((job)=><JobCard key={job.id} job={job}/>)}
      </div>
    </div>
  )
}

export default TopNiches