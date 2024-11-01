import React from 'react'
import './index.css'
import { useNavigate, useParams } from 'react-router-dom';




const jobData = [
  { id: 1, company: "Tata Consultancy Services", role: "Software Engineer", location: "Mumbai", salary: 20, type: "Full Time", positions: 3, description: "Exciting opportunity to work on new technologies." },
  { id: 2, company: "Infosys", role: "Data Scientist", location: "Bangalore", salary: 30, type: "Intern", positions: 1, description: "Data analytics role focused on machine learning." },
  { id: 3, company: "Wipro", role: "Web Developer", location: "Hyderabad", salary: 15, type: "Full Time", positions: 2, description: "Developing user-friendly web applications." },
  { id: 4, company: "HCL Technologies", role: "Mobile Developer", location: "Chennai", salary: 25, type: "Full Time", positions: 1, description: "Building high-performance mobile applications." },
  { id: 5, company: "Accenture", role: "Business Analyst", location: "Pune", salary: 22, type: "Full Time", positions: 2, description: "Analyzing business needs and proposing solutions." },
  { id: 6, company: "Cognizant", role: "Cloud Engineer", location: "Noida", salary: 28, type: "Full Time", positions: 2, description: "Managing cloud-based infrastructure." },
  { id: 7, company: "Tech Mahindra", role: "DevOps Engineer", location: "Gurgaon", salary: 10, type: "Intern", positions: 1, description: "Implementing DevOps practices and tools." },
  { id: 8, company: "L&T Technology Services", role: "Data Engineer", location: "Ahmedabad", salary: 24, type: "Full Time", positions: 3, description: "Building and maintaining data pipelines." },
  { id: 9, company: "Mindtree", role: "UX Designer", location: "Kolkata", salary: 18, type: "Intern", positions: 1, description: "Designing intuitive user experiences." },
  { id: 10, company: "Zensar Technologies", role: "System Administrator", location: "Jaipur", salary: 50, type: "Full Time", positions: 2, description: "Maintaining system operations and performance." },
];
const   Jobdetails = () => {
  const params=useParams();
  console.log(params);
  const { JobId } = params;
  console.log(Number(JobId));
  const  navigate=useNavigate();
   const job=jobData.find(job=>job.id===parseInt(JobId));
  //  console.log(job);
   if (!job) {
    return <h1>Job not found</h1>;
  }
  return (
    <div>
      <h1>kjwdjdsk</h1>
    <button onClick={() => navigate(-1)}>Back</button>
    <h1>Job Details</h1>
    <h2>{job.role} at {job.company}</h2>
    <p><strong>Location:</strong> {job.location}</p>
    <p><strong>Type:</strong> {job.type}</p>
    <p><strong>Salary:</strong> ${job.salary}k per year</p>
    <p><strong>Open Positions:</strong> {job.positions}</p>
    <p><strong>Description:</strong> {job.description}</p>
  </div>
  )
}

export default Jobdetails