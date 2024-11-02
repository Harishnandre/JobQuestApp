import React from "react";
import { useParams } from "react-router-dom";
import "./index.css";
import JobCard from "../JobCard";

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
  

const  SearchResults = () => {
    const { searchTerm } = useParams();

    const filteredJobs = jobData.filter(job =>
      job.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="jobs-search-page">
        <h1>Search Results ({filteredJobs.length})</h1>
        <div className="search-card-containers">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
          ) : (
            <div className="search-no-results">
              <img src="https://img.freepik.com/premium-vector/search-result-find-illustration_585024-17.jpg" alt="No results" />
              <p>No jobs found matching "{searchTerm}".</p>
            </div>
          )}
        </div>
      </div>
    );
}

export default SearchResults;
