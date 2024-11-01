import './index.css'
import {  FaBookmark, FaMapMarkerAlt } from "react-icons/fa";

const JobCard = (props) => {
    const {job} = props

     return  <div key={job.id} className="job-card">
     <div className="card-header">
       <h4>{job.company}</h4>
       <FaBookmark className="bookmark-icon" />
     </div>
     <p className="location">
       <FaMapMarkerAlt className="location-icon" /> {job.location}
     </p>
     <p className="description">{job.description}</p>
     <div className="card-footer">
       <span>{job.role}</span>
       <span>{job.salary} LPA</span>
       <span>{job.type}</span>
       <span>{job.positions} positions</span>
     </div>
     <button className="details-button">Details</button>
   </div>
}
export default JobCard