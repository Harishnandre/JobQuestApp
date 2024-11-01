import React, { useState } from "react";

import { FaSearch, FaBookmark, FaMapMarkerAlt } from "react-icons/fa";
import "./index.css";
import { useNavigate } from "react-router-dom";


import "./index.css";
import JobCard from "../JobCard";


// Sample data with numerical salary values
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

// Filter options
const locations = [
  "All Locations", "Mumbai", "Bangalore", "Hyderabad", 
  "Chennai", "Pune", "Noida", "Gurgaon", 
  "Ahmedabad", "Kolkata", "Jaipur"
];

const salaryRanges = [
  "All Salaries", "Below 10 LPA", "10 LPA and above", 
  "20 LPA and above", "30 LPA and above", "40 LPA and above"
];

const employmentTypes = [
  "All Types", "Full Time", "Intern", 
  "Part Time", "Freelance"
];

function JobsSection() {



  const navigate=useNavigate();

  // States for each filter
  const [location, setLocation] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Function to filter jobs based on selected criteria
  const filteredJobs = jobData.filter(job => {
    const salaryCondition = salaryRange ? 
      (salaryRange === "Below 10 LPA" ? job.salary < 10 :
        salaryRange === "10 LPA and above" ? job.salary >= 10 && job.salary < 20 :
        salaryRange === "20 LPA and above" ? job.salary >= 20 && job.salary < 30 :
        salaryRange === "30 LPA and above" ? job.salary >= 30 && job.salary < 40 :
        salaryRange === "40 LPA and above" ? job.salary >= 40 :
        true) : true;

    return (
      (salaryCondition) &&
      (!location || job.location === location) &&
      (!employmentType || job.type === employmentType) &&
      (!searchTerm || job.role.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const handleClearFilters = () => {
    setLocation("");
    setSalaryRange("");
    setEmploymentType("");
    setSearchTerm("");
  };

  return (
    
    <div className="jobs-section">
      {/* Filter Panel */}
      <div className="filters">
        <h3>Filters</h3>

        <div className="filter-group">
          <p>Location</p>
          <select value={location} onChange={(e) => setLocation(e.target.value)}>
            {locations.map((loc, index) => (
              <option key={index} value={loc === "All Locations" ? "" : loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <p>Salary Range</p>
          <select value={salaryRange} onChange={(e) => setSalaryRange(e.target.value)}>
            {salaryRanges.map((range, index) => (
              <option key={index} value={range === "All Salaries" ? "" : range}>
                {range}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <p>Type of Employment</p>
          <select value={employmentType} onChange={(e) => setEmploymentType(e.target.value)}>
            {employmentTypes.map((type, index) => (
              <option key={index} value={type === "All Types" ? "" : type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <button className="clear-filters" onClick={handleClearFilters}>Clear Filters</button>
      </div>

      {/* Job Listings */}
      <div className="job-listings">
        {/* Search Element */}
        <div className="job-search">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by job title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Display filtered jobs or 'No results' */}
{filteredJobs.length > 0 ? (
  filteredJobs.map((job) => (
    <JobCard key={job.id} job={job} />
  ))
) : (
  <div className="no-results">
    <img src="https://img.freepik.com/premium-vector/search-result-find-illustration_585024-17.jpg" alt="No results" />
  </div>
)}

      </div>
    </div>
    
  );
}

export default JobsSection;
