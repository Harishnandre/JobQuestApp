import React, { useContext, useState, useEffect } from "react";
import { Authcontext } from "../../ContextAPI/Authcontext";
import axios from "axios";
import "./index.css"; // Import CSS file for stylingc
import { useNavigate } from "react-router-dom";
import JobQuestLoader from "../../Loader";

const MyApplications = () => {
    let [auth, setauth] = useContext(Authcontext);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user ,token} = auth || {};
    const navigate = useNavigate()
    const { _id } = user || {};

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/application/get/${_id}`);
                setApplications(response.data.applications);
                setLoading(false);
            } catch (err) {
                setError("Error fetching job applications");
                setLoading(false);
            }
        };
        fetchApplications();
    }, [auth, _id]);
    const handleGotoJob = (job_id)=>{
        navigate(`/job-details/${job_id}`);
    }
    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'rejected':
                return 'Red';
            case 'pending':
                return '#cccc00';
            case 'accepted':
                return 'Green';
            default:
                return 'Black';
        }
    };
    const handleApplyForJobs  = ()=>{
         navigate('/jobs')
    }
    return (
        <div className="my-applications">
            <h1>My Applications</h1>
            {loading ? (
                <JobQuestLoader/>
            ) : error ? (
                <p className="error">{error}</p>
            ) : applications.length == 0 ? (
                <div className="no-applications">
                    <p>You have not yet applied any job.</p>
                    <button className="apply-button" onClick={handleApplyForJobs}>
                        Browse and Apply for Jobs
                    </button>
                </div>
            ) :(
                <table className="applications-table">
                    <thead>
                        <tr>
                            <th>Job Title</th>
                            <th>Company</th>
                            <th>Status</th>
                            <th>Updated At</th>
                            <th>Applied At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map((app) => (
                            <tr key={app.jobInquiry._id} onClick={()=>{handleGotoJob(app.jobInquiry._id)}}>
                                <td>{app.jobInquiry.title}</td>
                                <td>{app.jobInquiry.company.name}</td>
                                <td style={{ color: getStatusColor(app.status) }}>{app.status}</td>
                                <td>{new Date(app.updatedAt).toLocaleString()}</td>
                                <td>{new Date(app.jobInquiry.createdAt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default MyApplications;
