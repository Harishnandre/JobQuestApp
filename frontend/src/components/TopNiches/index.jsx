import React from 'react'
import LatestJobCards from '../LatestJobCards';
import './index.css'
// import LatestJobCards from '../LatestJobCards';
const TopNiches = () => {
  const alljobs = [
    {
      id: 1,
      company: {
        name: "Tech Solutions Inc."
      },
      title: "Software Engineer",
      description: "Join our team to develop innovative software solutions.",
      location: "India",
      position: 3,
      jobType: "Full-Time",
      salary: 10, // Salary in LPA (Lakhs Per Annum)
    },
    {
      id: 2,
      company: {
        name: "Green Energy Corp."
      },
      title: "Project Manager",
      description: "Lead projects in renewable energy sector.",
      location: "India",
      position: 2,
      jobType: "Full-Time",
      salary: 12,
    },
    {
      id: 3,
      company: {
        name: "Finance Experts LLC"
      },
      title: "Financial Analyst",
      description: "Analyze financial data and assist with investment decisions.",
      location: "India",
      position: 5,
      jobType: "Part-Time",
      salary: 6,
    },
    {
      id: 4,
      company: {
        name: "Health Solutions"
      },
      title: "Healthcare Consultant",
      description: "Provide expert advice to improve healthcare systems.",
      location: "India",
      position: 1,
      jobType: "Contract",
      salary: 8,
    },
    {
      id: 5,
      company: {
        name: "E-commerce Ltd."
      },
      title: "Digital Marketing Specialist",
      description: "Manage online marketing campaigns and social media presence.",
      location: "India",
      position: 4,
      jobType: "Full-Time",
      salary: 9,
    },
    {
      id: 6,
      company: {
        name: "Smart Tech Solutions"
      },
      title: "Data Scientist",
      description: "Utilize data analytics to drive business strategies.",
      location: "India",
      position: 3,
      jobType: "Full-Time",
      salary: 15,
    },
    {
      id: 7,
      company: {
        name: "Creative Design Agency"
      },
      title: "Graphic Designer",
      description: "Create visual content to communicate messages effectively.",
      location: "India",
      position: 2,
      jobType: "Freelance",
      salary: 5,
    },
    {
      id: 8,
      company: {
        name: "Global Logistics"
      },
      title: "Supply Chain Manager",
      description: "Oversee and improve supply chain operations.",
      location: "India",
      position: 2,
      jobType: "Full-Time",
      salary: 11,
    },
    {
      id: 9,
      company: {
        name: "Cyber Security Solutions"
      },
      title: "Cyber Security Analyst",
      description: "Monitor and protect organization from cyber threats.",
      location: "India",
      position: 4,
      jobType: "Full-Time",
      salary: 14,
    },
    {
      id: 10,
      company: {
        name: "Mobile Apps Inc."
      },
      title: "Mobile Application Developer",
      description: "Develop user-friendly mobile applications for iOS and Android.",
      location: "India",
      position: 2,
      jobType: "Contract",
      salary: 13,
    }
  ];
  
  return (
    <div>
      <h1><span className='changecolor'>Latest & Top</span> Job Openings</h1>
      <div className='card-container'>
        {alljobs.length<=0?<span>No Job Available</span>:alljobs?.slice(0,6).map((job)=><LatestJobCards key={job.id} job={job}/>)}
      </div>
    </div>
  )
}

export default TopNiches