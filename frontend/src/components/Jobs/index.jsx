import React from 'react'
import './index.css';
import { useNavigate } from 'react-router-dom';

const Jobs= () => {
  const navigate = useNavigate();
    return (
      <div>
        
          <div className="container">
              <div className="header">
                  <input
                      type="text"
                      className="filter-input"
                      placeholder="Filter by name"
                      onChange={(e) => setInput(e.target.value)}
                  />
                  <button className="new-company-btn" onClick={() => navigate("/admin/jobs/createjob")}>
                      New Jobs
                  </button>
              </div>
              {/* <CompaniesTable /> */}
          </div>
      </div>
  );
  
}

export default Jobs