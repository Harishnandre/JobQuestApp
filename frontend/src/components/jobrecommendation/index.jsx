import React, { useContext, useEffect, useState } from 'react';
import { Authcontext } from '../ContextAPI/Authcontext';
import JobCard from '../JobCard';
import './index.css';
import { ToastContainer } from 'react-toastify';

const RecommendedJobs = () => {
  
  const [auth] = useContext(Authcontext);
  const { user } = auth || {};
  const [recommendedJobs, setRecommendedJobs] = useState([]);

  useEffect(() => {
    if (user?.recommendedJobs) {
      setRecommendedJobs(user.recommendedJobs);
    }
  }, [user]);

  return (
    <div className="recommended-jobs-container">
      <h1>Recommended Jobs</h1>
      {recommendedJobs.length === 0 ? (
        <p>No recommended jobs found.</p>
      ) : (
        <div className="card-containers">
          {recommendedJobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
      <ToastContainer/>
    </div>
  );
};

export default RecommendedJobs;
