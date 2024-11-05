import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import "./index.css";
import JobCard from "../JobCard";

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
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [location, setLocation] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchJobs() {
      setLoading(true); // Start loading
      try {
        const response = await axios.get("http://localhost:5000/api/v1/job/get"); // Replace with your backend URL
        setJobs(response.data);
        console.log(1)
        console.log(response)
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false); // End loading
      }
    }

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job => {
    const salaryCondition = salaryRange 
      ? (salaryRange === "Below 10 LPA" ? job.salary < 10 :
         salaryRange === "10 LPA and above" ? job.salary >= 10 && job.salary < 20 :
         salaryRange === "20 LPA and above" ? job.salary >= 20 && job.salary < 30 :
         salaryRange === "30 LPA and above" ? job.salary >= 30 && job.salary < 40 :
         salaryRange === "40 LPA and above" ? job.salary >= 40 :
         true)
      : true;

    const matchesSearchTerm = searchTerm
      ? job.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    return (
      salaryCondition &&
      (!location || job.location === location) &&
      (!employmentType || job.type === employmentType) &&
      matchesSearchTerm
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
            placeholder="Search by job title, company, or description"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Display loading spinner, filtered jobs, or 'No results' */}
        {loading ? (
          <div className="loading">Loading jobs...</div> 
        ) : (
          <div className="card-containers">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
            ) : (
              <div className="no-results">
                <img src="https://img.freepik.com/premium-vector/search-result-find-illustration_585024-17.jpg" alt="No results" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default JobsSection;
