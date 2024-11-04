// NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const NotFound = () => (
  <div className="notfound-container">
    <h1 className="notfound-title">404</h1>
    <h2 className="notfound-subtitle">Page Not Found</h2>
    <p className="notfound-description">
      Sorry, the page you’re looking for doesn’t exist.
    </p>
    <Link to="/" className="notfound-button">Go Back Home</Link>
  </div>
);

export default NotFound;
