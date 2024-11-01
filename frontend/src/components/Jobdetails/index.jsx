import React from 'react'
import './index.css'
import { useNavigate, useParams } from 'react-router-dom';




const jobData = [
  {
    id: 1,
    company: "Tata Consultancy Services",
    role: "Software Engineer",
    location: "Mumbai",
    salary: 20,
    type: "Full Time",
    positions: 3,
    description: "Exciting opportunity to work on new technologies.",
    about: "Tata Consultancy Services is a leading global IT services, consulting and business solutions organization.",
    duties: [
      "Develop and maintain software applications.",
      "Collaborate with cross-functional teams.",
      "Participate in code reviews.",
      "Troubleshoot and debug applications."
    ]
  },
  {
    id: 2,
    company: "Infosys",
    role: "Data Scientist",
    location: "Bangalore",
    salary: 30,
    type: "Intern",
    positions: 1,
    description: "Data analytics role focused on machine learning.",
    about: "Infosys is a global leader in technology services and consulting.",
    duties: [
      "Analyze data to derive insights.",
      "Develop predictive models.",
      "Communicate findings to stakeholders.",
      "Collaborate with data engineers."
    ]
  },
  
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
    return <h1 style={{ textAlign: 'center', color: 'red' }}>Job not found</h1>;
  }

  return (
    <div className="job-details-container">
      <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
      <div className="job-details-card">
        <h1 className="job-title">{job.role} at {job.company}</h1>
        <p className="job-location"><strong>Location:</strong> {job.location}</p>
        <p className="job-type"><strong>Type:</strong> {job.type}</p>
        <p className="job-salary"><strong>Salary:</strong> ${job.salary} Lakhs per year</p>
        <p className="job-positions"><strong>Open Positions:</strong> {job.positions}</p>
        
        <h2 className="job-description-title">Job Description</h2>
        <p className="job-description">{job.description}</p>
        
        <h2 className="about-company-title">About the Company</h2>
        <p className="about-company">{job.about}</p>
        
        <h2 className="duties-title">Duties and Responsibilities</h2>
        <ul className="duties-list">
          {job.duties.map((duty, index) => (
            <li key={index}>{duty}</li>
          ))}
        </ul>
        
        <button className="apply-button">Apply Now</button>
      </div>
    </div>
  );
}

export default Jobdetails