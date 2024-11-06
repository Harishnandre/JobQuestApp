import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./index.css";
import JobCard from "../JobCard";
import JobQuestLoader from "../Loader";

const SearchResults = () => {
    const { searchTerm } = useParams();
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFilteredJobs = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/job/get?keyword=${searchTerm}`);
                if (response.data.success) {
                    setFilteredJobs(response.data.jobs);
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

        fetchFilteredJobs();
    }, [searchTerm]);

    return (
        <div className="jobs-search-page">
            <h1>Search Results ({filteredJobs.length})</h1>
            {loading ? (
                <JobQuestLoader/> // You can replace this with a spinner if needed
            ) : error ? (
                <p>{error}</p>
            ) : (
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
            )}
        </div>
    );
};

export default SearchResults;
