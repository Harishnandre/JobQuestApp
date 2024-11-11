// NotFound.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './index.css';

const NotFound = () => {
  const navigate=useNavigate()
  const onGoTOHome=()=>{
    navigate(-1);
    return
  }
  return (
  <div className="notfound-container">
    <h1 className="notfound-title">404</h1>
    <h2 className="notfound-subtitle">Page Not Found</h2>
    <p className="notfound-description">
      Sorry, the page you’re looking for doesn’t exist.
    </p>
    <button onClick={onGoTOHome} className="notfound-button">Go Back</button>
  </div>
);
}

export default NotFound;
