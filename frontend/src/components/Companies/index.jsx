// import React, { useContext, useEffect, useState } from 'react';
// import './index.css';
// import { useNavigate } from 'react-router-dom';
// import { Companycontext } from '../ContextAPI/Companycontext';


// const Companies = () => {
//     const {companyData} = useContext(Companycontext);
//     const navigate = useNavigate();
//     const [input, setInput] = useState(""); // Add state to handle filter input
//     console.log(companyData);
//     return (
//         <div>
//         <div className="container">
//             <div className="header">
//                 <input
//                     type="text"
//                     className="filter-input"
//                     placeholder="Filter by name"
//                     onChange={(e) => setInput(e.target.value)}
//                 />
//                 <button className="new-company-btn" onClick={() => navigate("/admin/companies/create")}>
//                     New Company
//                 </button>
//             </div>

//             <div className="company-item-content">
//                 {companyData.length && companyData.map((company) => (
//                     <div key={company._id} className="company-inner-content">
//                         <div className="category-icon">
//                             <img src={company.logo} alt="Company Logo" className="company-logo" />
//                         </div>
//                         <div className="company-detail">
//                             <p className="company-title">
//                                 <span className="dot-before"></span> {company.title}
//                             </p>
//                             <div className="company-info">
//                                 <p className="company-description">{company.description}</p>
//                                 <p className="company-website">
//                                     <a href={company.website} target="_blank" rel="noopener noreferrer">
//                                         {company.website}
//                                     </a>
//                                 </p>
//                                 <ul className="company-location">
//                                     {company.locatio.map((l) => (
//                                         <li key={l}>{l}</li>
//                                     ))}
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//         </div>
//     </div>
// );

// }

// export default Companies


import React, { useContext, useEffect, useState } from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';
import { Companycontext } from '../ContextAPI/Companycontext';

const Companies = () => {
    const { companyData } = useContext(Companycontext); // Default to empty array if undefined
    const navigate = useNavigate();
    const [input, setInput] = useState(""); // Filter input state
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        // Check if companyData has been populated
        if (companyData.length > 0) setLoading(false);
    }, [companyData]);

    // // Debugging statement to check data load
    // console.log("Company data:", companyData);

    if (loading) {
        return <div>Loading...</div>; // Show loading until data is ready
    }

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
                            <div className="category-icon">
                                <img src={company.logo} alt="Company Logo" className="company-logo" />
                            </div>
                            <div className="company-detail">
                                <p className="company-title">
                                    <span className="dot-before"></span> {company.title}
                                </p>
                                <div className="company-info">
                                    <p className="company-description">{company.description}</p>
                                    <p className="company-website">
                                        <a href={company.website} target="_blank" rel="noopener noreferrer">
                                            {company.website}
                                        </a>
                                    </p>
                                    <ul className="company-location">
                                        {company.location?.map((l) => (
                                            <li key={l}>{l}</li>
                                        ))}
                                    </ul>
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
