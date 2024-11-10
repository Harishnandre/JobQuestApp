import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Authcontext } from "../ContextAPI/Authcontext";
import { Jobcontext } from "../ContextAPI/Jobcontext";


const Applicant=()=>{
      const {jobId}=useParams();
      const [auth]=useContext(Authcontext);
      const {token}=auth;
      const [applicantsDetail,setApplicantsDetail]=useState([]);
      const {recruiterJobs}=useContext(Jobcontext);
      const job = recruiterJobs.find(job =>job._id === jobId);
      console.log(recruiterJobs,job);
      useEffect(()=>{
          const fetchAllApplicants=async()=>{
            try {
                const res = await axios.get(`http://localhost:5000/api/v1/application/get/job/${jobId}`,{
                    withCredentials: true,
                    headers: {
                        'Authorization': `Bearer ${token}` // Add the token here
                    }
                });
                if (res?.data?.success) {
                    toast.success(res.data.message);
                    console.log(res.data.job.applications);
                    setApplicantsDetail(res.data.job.applications);
                } else {
                    toast.error(res.data.message);
                }
            } catch (error) {
                console.error("Error during fetching applicants:", error);
                if (error.response) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error("Fetching of Applicants failed. Please try again later.");
                }
            }
          }
          fetchAllApplicants();
      },[]);

      return (   
        <>
        {applicantsDetail.length===0?<h1>No Applicants applied to this Job</h1>:
        <div>
            <h1>Total applicants who applied for {job.title} in {job.company.name} are:{applicantsDetail.length}</h1>
        <div>
        <table className="applications-table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Emailid</th>
                <th>PhoneNo.</th>
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
                    <td>Accepted</td>
                </tr>
            ))}
        </tbody>
    </table> 
        </div>
        </div>
        }
        </> 
         );  
     
}

export default Applicant;