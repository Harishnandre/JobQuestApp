import React from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import './index.css';

const Aboutus = () => {
  return (
    <div className="about-us">
      <header className="about-us-header">
        <h1>Welcome to JobQuest</h1>
        <p>Your go-to platform for job opportunities and career growth.</p>
      </header>

      <section className="features">
        <h2>Key Features</h2>
        <ul>
          <li><AiFillCheckCircle className="icon" /> Secure login for Recruiters and Job Seekers</li>
          <li><AiFillCheckCircle className="icon" /> Job search by keywords, location, industry, etc.</li>
          <li><AiFillCheckCircle className="icon" /> Refine search with filters (salary, company size, etc.)</li>
          <li><AiFillCheckCircle className="icon" /> Apply directly through the platform</li>
          <li><AiFillCheckCircle className="icon" /> Upload resumes and manage profiles</li>
          <li><AiFillCheckCircle className="icon" /> Receive job alerts and notifications</li>
        </ul>
      </section>

      <section className="advanced-features">
        <h2>Advanced Features</h2>
        <ul>
          <li><AiFillCheckCircle className="icon" /> Chatbots for instant support and guidance</li>
          <li><AiFillCheckCircle className="icon" /> Personalized job recommendations</li>
        </ul>
      </section>

      <section className="illustrations">
        <div className="illustration">
          <h3>Search Jobs</h3>
          <p>Find the perfect job for you with tailored search filters.</p>
          <img src="https://static.vecteezy.com/system/resources/previews/001/870/901/original/website-design-of-looking-for-work-and-finding-employees-jobs-candidates-that-match-with-search-engine-flat-illustration-for-landing-page-template-ui-ux-website-mobile-app-flyer-brochure-ads-free-vector.jpg" alt="Job Search" />
          <div className="desc">
            This image showcases how JobQuest allows users to search for jobs based on different filters like location, salary, and job type. You can easily find jobs that match your criteria.
          </div>
        </div>

        <div className="illustration">
          <h3>Apply for Jobs</h3>
          <p>Apply to your dream job with a few clicks.</p>
          <img src="https://seeromega.com/wp-content/uploads/2021/01/Best-Job-Search-Apps.png" alt="Apply for Jobs" />
          <div className="desc">
            This image represents the seamless job application process on JobQuest. Once you find the right job, you can apply directly through the platform with a few simple clicks.
          </div>
        </div>

        <div className="illustration">
          <h3>Instant Support via Chatbot</h3>
          <p>Get personalized help with the job search process through our chatbot assistant.</p>
          <img src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/0d082c147345521.62c0afa605fdd.png" alt="Chatbot Support" />
          <div className="desc">
            This image illustrates our chatbot feature, which provides users with immediate assistance to find the right job based on their preferences and qualifications. It's like having a personal job assistant at your fingertips!
          </div>
        </div>
      </section>

      {/* Creators Section */}
      <section className="creators">
        <h2>Meet the Creators</h2>
        <div className="creator-cards">
          <div className="creator-card">
            <div className="creator-avatar">T</div>
            <h3>Md Tauqeer</h3>
            <p>Backend Developer</p>
            <p>Responsible for building the backend and ensuring the platform runs smoothly and securely. </p>
          </div>
          <div className="creator-card">
            <div className="creator-avatar">H</div>
            <h3>Nandra Harish</h3>
            <p>UI/UX Designer</p>
            <p>Crafted the elegant and user-friendly interface of JobQuest, focusing on great user experience.</p>
          </div>
          <div className="creator-card">
            <div className="creator-avatar">T</div>
            <h3>Md Talha</h3>
            <p>Lead Developer</p>
            <p>A passionate developer who brought the core logic and functionality of JobQuest to life. </p>
          </div>
          <div className="creator-card">
            <div className="creator-avatar">V</div>
            <h3>Eera Vikas</h3>
            <p>Frontend Developer</p>
            <p>Worked on the front-end architecture, ensuring a seamless, modern, and interactive experience for users.</p>
          </div>
        </div>
      </section>

      <footer className="about-us-footer">
        <p>Crafted with ❤️ by the JobQuest Team</p>
      </footer>
    </div>
  );
};

export default Aboutus;
