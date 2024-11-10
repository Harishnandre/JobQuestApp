import React from 'react';
import './index.css'; // Import the CSS file for styling
import { FaFacebookSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <div>
            <li><Link to='/about'>About Us</Link></li>
            <li><Link to='/contact'>Contact Us</Link></li>
            </div>
            
          </ul>
        </div>

        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://facebook.com" ><FaFacebookSquare /></a>
            <a href="https://twitter.com" > <FaTwitter /> </a>
            <a href="https://linkedin.com" ><FaLinkedin /></a>
            <a href="https://instagram.com" ><FaInstagramSquare />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} HireQuest. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
