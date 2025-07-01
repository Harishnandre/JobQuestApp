import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import "./index.css";
import JobCard from "../JobCard";
import JobQuestLoader from "../Loader";
import { ToastContainer } from 'react-toastify';

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
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showOpened, setShowOpened] = useState(true);
  const [showClosed, setShowClosed] = useState(false);
  const [error, setError] = useState(null);

  const fetchJobs = async (search = "") => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/job/get?keyword=${search}`);
      if (response.data.success) {
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

  useEffect(() => {
    fetchJobs(searchTerm);
  }, [searchTerm]);

  const filteredJobs = jobs.filter(job => {
    const now = new Date();
    const isOpened = new Date(job.jobLastDate) >= now;
    const isClosed = !isOpened;

    const matchesStatus =
      (showOpened && isOpened) ||
      (showClosed && isClosed);

    const salaryCondition = salaryRange
      ? (salaryRange === "Below 10 LPA" ? job.salary < 10 :
        salaryRange === "10 LPA and above" ? job.salary >= 10 && job.salary < 20 :
        salaryRange === "20 LPA and above" ? job.salary >= 20 && job.salary < 30 :
        salaryRange === "30 LPA and above" ? job.salary >= 30 && job.salary < 40 :
        salaryRange === "40 LPA and above" ? job.salary >= 40 :
        true)
      : true;

    return (
      matchesStatus &&
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
    setShowOpened(true);
    setShowClosed(true);
    fetchJobs("");
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
            fetchJobs(searchTerm);
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
            fetchJobs(searchTerm);
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
            fetchJobs(searchTerm);
          }}>
            {employmentTypes.map((type, index) => (
              <option key={index} value={type === "All Types" ? "" : type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <p>Status</p>
          <div>
            <label>
              <input
                type="checkbox"
                checked={showOpened}
                onChange={() => setShowOpened(!showOpened)}
              />{" "}
              Opened
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={showClosed}
                onChange={() => setShowClosed(!showClosed)}
              />{" "}
              Closed
            </label>
          </div>
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
              fetchJobs(e.target.value);
            }}
          />
        </div>

        {loading ? (
          <JobQuestLoader />
        ) : (
          <div className="card-containers">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => <JobCard key={job._id} job={job} />)
            ) : (
              <div className="no-results">
                <img src="https://img.freepik.com/premium-vector/search-result-find-illustration_585024-17.jpg" alt="No results" />
              </div>
            )}
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default JobsSection;