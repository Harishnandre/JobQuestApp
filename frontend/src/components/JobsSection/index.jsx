import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import "./index.css";
import JobCard from "../JobCard";
import JobQuestLoader from "../Loader";
import { ToastContainer } from 'react-toastify';

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
  const [error, setError] = useState(null);

  // Function to fetch jobs from the backend
  const fetchJobs = async (search = "") => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/job/get?keyword=${search}`);
      if (response.data.success) {
        console.log(response.data.jobs);
        setJobs(response.data.jobs);
      } else {
        setError("Failed to load jobs.");
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setError("Error fetching jobs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // useEffect to fetch jobs on initial load and when filters/search change
  useEffect(() => {
    fetchJobs(searchTerm);
  }, [searchTerm]);

  const filteredJobs = jobs.filter(job => {
    const salaryCondition = salaryRange 
      ? (salaryRange === "Below 10 LPA" ? job.salary < 10 :
         salaryRange === "10 LPA and above" ? job.salary >= 10 && job.salary < 20 :
         salaryRange === "20 LPA and above" ? job.salary >= 20 && job.salary < 30 :
         salaryRange === "30 LPA and above" ? job.salary >= 30 && job.salary < 40 :
         salaryRange === "40 LPA and above" ? job.salary >= 40 :
         true)
      : true;

    return (
      salaryCondition &&
      (!location || job.location === location) &&
      (!employmentType || job.jobType === employmentType)
    );
  });

  const handleClearFilters = () => {
    setLocation("");
    setSalaryRange("");
    setEmploymentType("");
    setSearchTerm("");
    fetchJobs(""); // Fetch all jobs after clearing filters
  };

  return (
    <div className="jobs-section">
      {/* Filter Panel */}
      <div className="filters">
        <h3>Filters</h3>

        <div className="filter-group">
          <p>Location</p>
          <select value={location} onChange={(e) => { 
            setLocation(e.target.value);
            fetchJobs(searchTerm); // Re-fetch jobs with search term
          }}>
            {locations.map((loc, index) => (
              <option key={index} value={loc === "All Locations" ? "" : loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <p>Salary Range</p>
          <select value={salaryRange} onChange={(e) => { 
            setSalaryRange(e.target.value);
            fetchJobs(searchTerm); // Re-fetch jobs with search term
          }}>
            {salaryRanges.map((range, index) => (
              <option key={index} value={range === "All Salaries" ? "" : range}>
                {range}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <p>Type of Employment</p>
          <select value={employmentType} onChange={(e) => { 
            setEmploymentType(e.target.value);
            fetchJobs(searchTerm); // Re-fetch jobs with search term
          }}>
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
            placeholder="Search by job title or description or company name"
            value={searchTerm}
            onChange={(e) => { 
              setSearchTerm(e.target.value);
              fetchJobs(e.target.value); // Fetch jobs with updated search term
            }}
          />
        </div>

        {/* Display loading spinner, filtered jobs, or 'No results' */}
        {loading ? (
 <JobQuestLoader/>
        ) : (
          <div className="card-containers">
            {filteredJobs.length > 0 ? ( 
              filteredJobs.map((job) => <JobCard key={job._id} job={job} />) // Use job._id for the key
            ) : (
              <div className="no-results">
                <img src="https://img.freepik.com/premium-vector/search-result-find-illustration_585024-17.jpg" alt="No results" />
              </div>
            )}
          </div>
        )}
      </div>
      <ToastContainer/>
    </div>
  );
}

export default JobsSection;
