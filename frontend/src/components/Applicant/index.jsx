// import { useContext, useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { Authcontext } from "../ContextAPI/Authcontext";
// import { Jobcontext } from "../ContextAPI/Jobcontext";
// import './index.css';
// import { AiOutlineDownSquare } from "react-icons/ai";

// const Applicant = () => {
//     const { jobId } = useParams();
//     const [auth] = useContext(Authcontext);
//     const { token } = auth;
//     const [applicantsDetail, setApplicantsDetail] = useState([]);
//     const [loading, setLoading] = useState(true); // Loading state
//     const { recruiterJobs } = useContext(Jobcontext);
//     const job = recruiterJobs.find(job => job._id === jobId);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchAllApplicants = async () => {
//             try {
//                 const res = await axios.get(
//                     `http://localhost:5000/api/v1/application/get/job/${jobId}`,
//                     {
//                         withCredentials: true,
//                         headers: {
//                             'Authorization': `Bearer ${token}`
//                         }
//                     }
//                 );
//                 if (res?.data?.success) {
//                     toast.success(res.data.message);
//                     console.log(res.data.job.applications);
//                     setApplicantsDetail(res.data.job.applications);
//                 } else {
//                     toast.error(res.data.message);
//                 }
//             } catch (error) {
//                 console.error("Error during fetching applicants:", error);
//                 if (error.response) {
//                     toast.error(error.response.data.message);
//                 } else {
//                     toast.error("Fetching of Applicants failed. Please try again later.");
//                 }
//             } finally {
//                 setLoading(false); // Stop loading once the request completes
//             }
//         };
//         fetchAllApplicants();
//     }, [jobId, token]);

//     // Return loading state first
//     if (loading) {
//         return <h1>Loading applicants...</h1>;
//     }

//     // Return message if no job found
//     if (!job) {
//         return <h1>Job not found. Please try again.</h1>;
//     }

//     return (
//         <>
//             {applicantsDetail.length === 0 ? (
//                 <h1>No applicants applied to this job</h1>
//             ) : (
//                 <div>
//                     <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
//                     <h1>Total applicants who applied for {job.title} at {job.company.name}: {applicantsDetail.length}</h1>
//                     <div>
//                         <table className="applications-table">
//                             <thead>
//                                 <tr>
//                                     <th>Name</th>
//                                     <th>Email ID</th>
//                                     <th>Phone No.</th>
//                                     <th>Resume</th>
//                                     <th>Applied At</th>
//                                     <th>Progress</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {applicantsDetail.map((app) => (
//                                     <tr key={app._id}>
//                                         <td>{app.applicant.fullName}</td>
//                                         <td>{app.applicant.email}</td>
//                                         <td>{app.applicant.phoneNumber}</td>
//                                         <td>{app.applicant.resume}</td>
//                                         <td>{new Date(app.createdAt).toLocaleString()}</td>
//                                         <td className="progressicon">     <AiOutlineDownSquare size={25} />
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };

// export default Applicant;
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Authcontext } from "../ContextAPI/Authcontext";
import { Jobcontext } from "../ContextAPI/Jobcontext";
import './index.css';
import { AiOutlineDownSquare } from "react-icons/ai";

const Applicant = () => {
    const { jobId } = useParams();
    const [auth] = useContext(Authcontext);
    const { token } = auth;
    const [applicantsDetail, setApplicantsDetail] = useState([]);
    const [loading, setLoading] = useState(true);
    const { recruiterJobs } = useContext(Jobcontext);
    const job = recruiterJobs.find(job => job._id === jobId);
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState({});
    const [status, setStatus] = useState({});

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5000/api/v1/application/get/job/${jobId}`,
                    {
                        withCredentials: true,
                        headers: { 'Authorization': `Bearer ${token}` }
                    }
                );
                if (res?.data?.success) {
                    toast.success(res.data.message);
                    setApplicantsDetail(res.data.job.applications);
                    const initialStatus = res.data.job.applications.reduce((acc, app) => {
                        acc[app._id] = app.status || "Pending";
                        return acc;
                    }, {});
                    setStatus(initialStatus);
                } else {
                    toast.error(res.data.message);
                }
            } catch (error) {
                toast.error("Fetching of Applicants failed.");
            } finally {
                setLoading(false);
            }
        };
        fetchAllApplicants();
    }, [jobId, token]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            setDropdownOpen({});
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const toggleDropdown = (applicantId) => {
        setDropdownOpen(prev => ({ ...prev, [applicantId]: !prev[applicantId] }));
    };

    const handleStatusChange = async (applicantId, newStatus) => {
        const confirmChange = window.confirm(`Are you sure you want to set status to ${newStatus}?`);
        if (!confirmChange) return;

        try {
            const res = await axios.patch(
                `http://localhost:5000/api/v1/application/status/${applicantId}`,
                { status: newStatus },
                {
                    withCredentials: true,
                    headers: { 'Authorization': `Bearer ${token}` }
                }
            );

            if (res?.data?.success) {
                toast.success(`Status updated to ${newStatus}`);
                setStatus(prev => ({ ...prev, [applicantId]: newStatus }));
            } else {
                toast.error("Failed to update status.");
            }
        } catch (error) {
            toast.error("An error occurred while updating the status.");
        }
    };

    if (loading) {
        return <h1>Loading applicants...</h1>;
    }

    if (!job) {
        return <h1>Job not found. Please try again.</h1>;
    }

    return (
        <>
            {applicantsDetail.length === 0 ? (
                <h1>No applicants applied to this job</h1>
            ) : (
                <div>
                    <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
                    <h1>Total applicants for {job.title} at {job.company.name}: {applicantsDetail.length}</h1>
                    <table className="applications-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email ID</th>
                                <th>Phone No.</th>
                                <th>Resume</th>
                                <th>Applied At</th>
                                <th>Progress</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applicantsDetail.map((app) => (
                                <tr key={app._id}>
                                    <td>{app.applicant.fullName}</td>
                                    <td>{app.applicant.email}</td>
                                    <td>{app.applicant.phoneNumber}</td>
                                    <td>{app.applicant.resume}</td>
                                    <td>{new Date(app.createdAt).toLocaleString()}</td>
                                    <td>
                                        {status[app._id]}
                                        <AiOutlineDownSquare
                                            size={20}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleDropdown(app._id);
                                            }}
                                            style={{ cursor: 'pointer', marginLeft: '10px' }}
                                        />
                                        {dropdownOpen[app._id] && (
                                            <div className="dropdown">
                                                <div onClick={() => handleStatusChange(app._id, "Accepted")} className="dropdown-item">
                                                    Accepted
                                                </div>
                                                <div onClick={() => handleStatusChange(app._id, "Rejected")} className="dropdown-item">
                                                    Rejected
                                                </div>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default Applicant;

