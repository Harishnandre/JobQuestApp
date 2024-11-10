import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineMail, AiOutlinePhone, AiOutlineEnvironment } from 'react-icons/ai'; 
import './index.css';
import { Link } from 'react-router-dom';

const Contactus = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !feedback) {
      toast.error("All fields are required!");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast.success("Thank you for your feedback!");
      setName('');
      setEmail('');
      setFeedback('');
    }, 2000);
  };

  return (
    <>
    <div className="contact-us-container">
      <div className="contact-us-header">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you! Please leave your feedback or any inquiries below.</p>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <h3>Contact Information</h3>

          <div className="info-item">
            <AiOutlineMail size={30} className="contact-icon" />
            <p>Email: <a href="mailto:info@jobquest.com">info@jobquest.com</a></p>
          </div>
          
          <div className="info-item">
            <AiOutlinePhone size={30} className="contact-icon" />
            <p>Phone: <a href="tel:+123456789">+1 234 567 89</a></p>
          </div>

          <Link to="/google-map" className="info-item">
            <AiOutlineEnvironment size={30} className="contact-icon" />
            <p>Location: 123 JobQuest St., PrayagRaj, India</p>
          </Link>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your name"
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="input-group">
            <label htmlFor="feedback">Your Feedback</label>
            <textarea
              id="feedback"
              name="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
              placeholder="Write your feedback"
              rows="5"
            />
          </div>

          <div className="button-container">
            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </div>
        </form>
      </div>

      <footer className="footer">
        <p>Crafted with ❤️ by the JobQuest Team</p>
      </footer>
    </div>
    <ToastContainer />
    </>
  );
};

export default Contactus;
