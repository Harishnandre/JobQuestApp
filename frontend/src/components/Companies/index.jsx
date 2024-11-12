import React, { useContext, useState, useEffect } from 'react';
import './index.css';
import { Link, useNavigate,Navigate } from 'react-router-dom';
import { Companycontext } from '../ContextAPI/Companycontext';
import { LuPencil } from "react-icons/lu";
import JobQuestLoader from "../Loader";

const Companies = () => {
    const storedData = JSON.parse(localStorage.getItem("auth"));
    if(!storedData){
         alert("Please Login")
        return  <Navigate to='/login' replace/>
    }
    const { companyData } = useContext(Companycontext);
    const navigate = useNavigate();
    const [input, setInput] = useState(""); // Filter input state

    // Filtered company data based on user input
    const filteredData = companyData ? companyData.filter((company) =>
        company.name?.toLowerCase().includes(input.toLowerCase())
    ) : [];

    return (
    
        <div className="container">
            <div className="header">
                <input
                    type="text"
                    className="filter-input"
                    placeholder="Filter by company name"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button className="new-company-btn" onClick={() => navigate("/admin/companies/create")}>
                    New Company
                </button>
            </div>

            <div className="company-item-content">
                {filteredData.length > 0 ? (
                    filteredData.map((company) => (
                        <div key={company._id} className="company-inner-content">
                            <div className="company-header">
                                {company.logo && (
                                    <img src={company.logo} alt="Company Logo" className="company-logo" />
                                )}
                                <Link to={`/admin/companies/update/${company._id}`} className="edit-icon" title="Edit">
                                    <LuPencil />
                                </Link>
                            </div>
                            <div className="company-detail">
                                <p className="company-title">{company.name}</p>
                                <div className='comp_box'>
                                    {company.description && (
                                        <div className="company-description">{company.description}</div>
                                    )}
                                    {company.website && (
                                        <div className="company-website">
                                            <a href={company.website} target="_blank" rel="noopener noreferrer">
                                                {company.website}
                                            </a>
                                        </div>
                                    )}
                                    {company.location?.length > 0 && (
                                        <div className="company-location">
                                            {company.location.map((l) => (
                                                <li key={l}>{l}</li>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <h2>No companies match the filter criteria.</h2>
                )}
            </div>
        </div>
    );
};

export default Companies;
