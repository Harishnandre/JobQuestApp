import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Authcontext } from '../ContextAPI/Authcontext';
import ClipLoader from 'react-spinners/ClipLoader';

const Jobdetails = () => {
  const [auth, setAuth] = useContext(Authcontext);
  const { user, token } = auth
  const {_id } = user || {}
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { JobId } = useParams();

  const fetchJobDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/job/get/${JobId}`);
      if (response.data.success) {
        setJob(response.data.jobs);
      }
    } catch (error) {
      console.error("Error fetching job details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobDetails();
  }, [JobId]);

  const handleAlert = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to apply for this role",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Submit",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.post(
          `http://localhost:5000/api/v1/application/apply/${JobId}`,
          { id: _id,
            token : token
          }
        );

        if (response.data.success) {
          Swal.fire({
            title: "Thank you!",
            text: "Your application has been sent",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Oops!",
            text: response.data.message,
            icon: "error",
          });
        }
      } catch (error) {
        console.log(error)
        Swal.fire({
          title: "Error!",
          text: error.response.data.message,
          icon: "error",
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="loader-container">
        <ClipLoader color="#007bff" loading={loading} size={50} />
      </div>
    );
  }

  if (!job) {
    return <h1 style={{ textAlign: 'center', color: 'red', margin: '100px' }}>Job not found</h1>;
  }

  return (
    <div className="job-details-container">
      <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
      <div className="job-details-card">
        <h1 className="job-title">{job.title} at {job.company.name}</h1>
        <p className="job-location"><strong>Location:</strong> {job.location}</p>
        <p className="job-type"><strong>Type:</strong> {job.jobType}</p>
        <p className="job-salary"><strong>Salary:</strong> {job.salary} LPA</p>
        <p className="job-positions"><strong>Open Positions:</strong> {job.vacancies}</p>
        
        <h2 className="job-description-title">Job Description</h2>
        <p className="job-description">{job.description}</p>
        
        <h2 className="requirements-title">Requirements</h2>
        <ul className="requirements-list">
          {job.requirements.map((requirement, index) => (
            <li key={index}>{requirement}</li>
          ))}
        </ul>

        {auth?.user ? (
          <button className="apply-button" onClick={handleAlert}>Apply Now</button>
        ) : (
          <div className='apply-changes'>
            <button className="apply-button" onClick={() => navigate('/login')}>Login</button>
            <button className="apply-button" onClick={() => navigate('/register')}>Register</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobdetails;
