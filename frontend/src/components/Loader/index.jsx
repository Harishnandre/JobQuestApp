import React from "react";
import Loader from 'react-loader-spinner';
import './index.css'

function JobQuestLoader() {
     return <div className="jobs-loader-container">
     <Loader type="ThreeDots" color="#2596be" height="50" width="50" />
   </div>
}

export default JobQuestLoader