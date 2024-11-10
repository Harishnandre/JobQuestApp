
import React, { useContext, useState } from 'react';
import './index.css';
import { Link, useNavigate } from 'react-router-dom';
import { Companycontext } from '../ContextAPI/Companycontext';
import { LuPencil } from "react-icons/lu";


const Companies = () => {
    const { companyData } = useContext(Companycontext); 
    // Default to empty array if undefined
    const navigate = useNavigate();
    const [input, setInput] = useState(""); // Filter input state // Loading state

    // useEffect(() => {
    //     // Check if companyData has been populated
    //     if (companyData.length > 0)
    // }, [companyData]);

    // // Debugging statement to check data load
    console.log("Company data:", companyData);


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
                    <button className="new-company-btn" onClick={() => navigate("/admin/companies/create")}>
                        New Company
                    </button>
                </div>
        
                <div className="company-item-content">
    {companyData.map((company) => (
        <div key={company._id} className="company-inner-content">
            <div className="company-header">
                <img src={company.logo} alt="Company Logo" className="company-logo" />
                <Link to={`/admin/companies/update/${company._id}`} className="edit-icon" title="Edit">
                   <LuPencil />
                </Link>
            </div>
            <div className="company-detail">
                <p className="company-title">{company.name}</p>
                <div className='comp_box'>
                <div className="company-description">{company.description}</div>
                <div className="company-website">
                        <a href={company.website} target="_blank" rel="noopener noreferrer">
                            {company.website}
                        </a>
                    </div>
                    <div className="company-location">
                        {company.location?.map((l) => (
                            <li key={l}>{l}</li>
                        ))}
                    </div>
                    </div>
                </div>
            </div>
    ))}
</div>
    

            </div>
        </div>
    );
};

export default Companies;
