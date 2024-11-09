
import React, { useState, useContext,useEffect } from 'react';
import { Link, useNavigate,Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import axios from 'axios'; // for network request
import './index.css';
import { Authcontext } from '../ContextAPI/Authcontext';


const Register = () => {
  const [fullName, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [answer, setAnswer] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState(""); // New state for gender
  //if already logged in go to home
  const AuthState = useContext(Authcontext)
  const [auth,setauth,isLoggedIn,setisLoggedIn] = AuthState
  
  const navigate = useNavigate();
  if(isLoggedIn){
     return <Navigate to='/dashboard'/>
  }

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const formData = {
      fullName,
      role,
      email,
      password,
      phoneNumber,
      address,
      answer,
      gender,
    };
  
    console.log("Submitting form with data:", formData); // Log form data
  
    try {
      const res = await axios.post('http://localhost:5000/api/v1/user/register', formData);
      console.log("Response:", res.data); // Log the response data
  
      if (res.data.success) {
        toast.success(res.data.message);
        // Wait for 1 second before navigating
        setTimeout(() => {
          navigate('/login'); // Change '/dashboard' to the route you want to navigate to
        }, 1000);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log("Error during registration:", error); // Log the entire error
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Registration failed. Please try again later.");
      }
    }
  };
  

  return (
    <>
      <div className="form-container">
        <h3>Create a new account</h3>
        <form action="#" onSubmit={handleSubmit}>
          <div className="registerbox">
            <div className="wrapper1">
              <div className='inputTag'>
                <p>Register As</p>
                <select value={role} onChange={handleRoleChange}>
                  <option value="">Select Role</option>
                  <option value="Recruiter">Register as an Employer</option>
                  <option value="Job-Seeker">Register as a Job Seeker</option>
                </select>
              </div>
              <div className='inputTag'>
                <p>Name</p>
                <input
                  type="text"
                  onChange={handleNameChange}
                  placeholder="Enter your name"
                  required
                  value={fullName}
                />
              </div>
            </div>

            <div className="wrapper2">
              <div className='inputTag'>
                <p>Email</p>
                <input
                  type="email"
                  onChange={handleEmailChange}
                  placeholder="youremail@gmail.com"
                  required
                  value={email}
                />
              </div>
              <div className="inputTag">
                <p>Phone Number</p>
                <input
                  type="text"
                  onChange={handlePhoneChange}
                  placeholder="111-222-333"
                  required
                  value={phoneNumber}
                />
              </div>
            </div>

            <div className="wrapper3">
            <div className='inputTag'>
                <p>Gender</p>
                <select value={gender} onChange={handleGenderChange} required>
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  
                </select>
              </div>

              <div className="inputTag">
                <p>Password</p>
                <input
                  type="password"
                  onChange={handlePasswordChange}
                  placeholder="Create password"
                  required
                  value={password}
                />
              </div>
              <div className='inputTag'>
                <p>Your Answer</p>
                <input
                  type="text"
                  onChange={handleAnswerChange}
                  placeholder="What is Your Favourite Actor"
                  required
                  value={answer}
                />
              </div>
              <div className='inputTag'>
                <p>Address</p>
                <input
                  type="text"
                  onChange={handleAddressChange}
                  placeholder="Address"
                  required
                  value={address}
                />
              </div>
            </div>

  
            <div className='wrapper4'>
              <div className="policy">
                <h3>
                  <input type="checkbox" required /> I accept all terms & conditions
                </h3>
              </div>
              <div className="input-box button">
                <input type="submit" className='reg-link' value="Register Now" />
              </div>
              <div className="text">
                <h3><Link to='/login'>Already have an account? </Link></h3>
              </div>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Register;
