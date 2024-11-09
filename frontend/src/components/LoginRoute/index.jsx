import './index.css';
import React, { useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Cookies from 'js-cookie';
import { Authcontext } from '../ContextAPI/Authcontext';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  
  const AuthState = useContext(Authcontext);
  const [auth, setAuth, isLoggedIn, setIsLoggedIn] = AuthState;
  const { user } = auth;
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      if (role === 'Recruiter') {
        navigate('/admin/companies');
      } else {
        navigate('/dashboard', { state: { user } });
      }
    }
  }, [isLoggedIn, navigate, user, role]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic form validation
    if (!email || !password || !role) {
      toast.error("All fields are required.");
      return;
    }

    const formData = {
      role,
      email,
      password,
    };

    console.log("Form Data:", formData);

    try {
      const res = await axios.post('http://localhost:5000/api/v1/user/login', formData);

      if (res.data.success) {
        const { data } = res;
        const { auth } = data || {};
        const { token, user } = auth;

        localStorage.setItem("auth", JSON.stringify({ user_id: user._id, token }));
        setAuth({ user, token });
        setIsLoggedIn(true);
        toast.success(res.data.message);
// setTimeout(() => {
//           navigate('/dashboard',{state:{user}}); // Change '/dashboard' to the route you want to navigate to
//         }, 1000);
        
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error.response.data);
      toast.error(error.response.data.message || "Login failed. Please try again.");
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="box-form">
          <div className="left">
            <div className="overlay">
              <h1>Hello World.</h1>
              <h3>Great to have you back!</h3>
              <p>Welcome to JobQuest, you can login and signup with your Email and Password</p>
            </div>
          </div>
          <div className="right">
            <h3>Login Form</h3><br/>
            <form onSubmit={handleSubmit}>
              <p>Don't have an account? <Link to="/register">Create Your Account</Link> it takes less than a minute</p>
              <div className="inputs">
                <div className='inputTag'>
                  <select value={role} onChange={handleRoleChange}>
                    <option value="">Select Role</option>
                    <option value="Recruiter">Login as an Employer</option>
                    <option value="Job-Seeker">Login as a Job Seeker</option>
                  </select>
                </div>
                <input type="text" placeholder="Email" onChange={handleEmailChange} value={email} />
                <br/>
                <input type="password" placeholder="Password" onChange={handlePasswordChange} value={password} />
              </div>
              <br />
              <div className="remember-me--forget-password">
                <Link to='/forget-password'>Forget password?</Link>
              </div>
              <br />
              <button type='submit'>Login</button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
