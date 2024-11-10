import { createContext, useContext, useEffect, useState } from "react";
import { Authcontext } from "./Authcontext";
import axios from "axios";
import { toast } from "react-toastify";


export const Jobcontext=createContext({
    recruiterJobs:[],
    setRecruiterJobs:()=>{},
    getAllRecruiterJobs:()=>{}
});

const JobcontextProvider=({children})=>{
const [recruiterJobs,setRecruiterJobs]=useState([]);
const [auth]=useContext(Authcontext);
const {token}=auth;

useEffect(() => {
    // Only call getAllCompany when token is available
    if (token) {
       getAllRecruiterJobs();
    }
 }, [token]);
   
    const getAllRecruiterJobs = async (req, res) => {
       try {
          //console.log(token);
          const res = await axios.get('http://localhost:5000/api/v1/job/get-recruiter', {
             withCredentials: true,
             headers: {
                'Authorization': `Bearer ${token}` // Add the token here
             }
          });
          if (res?.data?.success) {
             setRecruiterJobs(res.data.jobs);
          }else{
             toast.error(res.data.message);
          }
       
          }catch (error) {
          console.error("Error during rendering of Jobs:", error);
          if (error.response) {
             toast.error(error.response.data.message);
          } else {
             toast.error("Jobs rendering failed. Please try again later.");
          }
          }
          }

return (
     <Jobcontext.Provider value={{recruiterJobs,setRecruiterJobs,getAllRecruiterJobs}}>
        {children}
     </Jobcontext.Provider>
);
}

export default JobcontextProvider;