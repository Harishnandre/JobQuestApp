import React, { useContext } from 'react';
import { Authcontext } from '../ContextAPI/Authcontext';
import JobCard from '../JobCard';
import './index.css'

const RecommendedJobs = () => {
  const [auth] = useContext(Authcontext);
  const { user } = auth || {};
  const recommendedJobs = user.recommendedJobs || []; // Default to an empty array if undefined
  console.log(recommendedJobs)
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
    </div>
  );
};

export default RecommendedJobs;