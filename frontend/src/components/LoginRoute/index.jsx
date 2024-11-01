//import React from 'react'
import './index.css'
import React, { useContext, useState } from 'react'
// import Layout from '../../components/layout/layout'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';  //for network request
import {Link, useNavigate,useLocation} from 'react-router-dom'
// import { Authcontext } from '../../components/contextAPI/Authcontext';
import { ToastContainer } from 'react-toastify';


 const Login=()=>{
  const [email ,setemail]=useState("");
  const [password ,setPassword]=useState("");
  const [role,setrole]=useState("");
  
//   const [auth,setauth]=useContext(Authcontext);
  const navigate=useNavigate();
  const location=useLocation();
  
  const handleemailChange=(event)=>{
    setemail(event.target.value);
  };
  const handlepasswordChange=(event)=>{
    setPassword(event.target.value);
  };
  const handlerolechange=(event)=>{
     setrole(event.target.value);
};
  const handleSubmit= async(event)=>{
    event.preventDefault();
    // console.log(event);
    const formData = {
      
      role,
      email,
      password,
    };
  
    console.log("Form Data:", formData);


   try{   //to handle the response and error
   const res=await  axios.post(`${import.meta.env.REACT_APP_API}/api/v1/auth/login`,{email,password});
  

  if(res.data.success){
    toast.success(res.data.message);
    //tauqeer work for navigation
	setauth({
      ...auth,
		user:res.data.user,
		token:res.data.token
	  });
	  localStorage.setItem('auth',JSON.stringify(res.data));
	  navigate(location.state || '/');
  }
  else{
    toast.error(res.data.message);
  }
  
   }
   catch(error){ 
    console.log(error.response.data)
    toast.error(error.response.data.message);
   }
    
    };
  return (
    <>
       <div className="login-container">
        <div class="box-form">
	<div class="left">
		<div class="overlay">
		<h1>Hello World.</h1>
    <h3>Great to have you back!</h3>
		<p>Welcome to JobQuest you can login and signup with your Email and Password</p>
		</div>
	</div>
		<div class="right">
		<h3>Login Form</h3><br/>
    <form action="#" onSubmit={handleSubmit}>
		<p>Don't have an account? <a href="#">Creat Your Account</a> it takes less than a minute</p>
		<div class="inputs">
               <div className='inputTag'>
               <select value={role} onChange={handlerolechange}>
          <option value="">Select Role</option>
          <option value="Employer">Login as an Employer</option>
          <option value="Job Seeker">Login as a Job Seeker</option>
          </select>
               </div>
         
          
			<input type="text" placeholder="Email"onChange={handleemailChange} value={email}/>
			<br/>
			<input type="password" placeholder="password" onChange={handlepasswordChange} value={password}/>
		</div>
			
			<br></br>
		<div class="remember-me--forget-password">

			<Link to='/forget-password'>forget password?</Link>
		</div>
			
			<br/>
			<button type='submit'>Login</button>
      </form>
	</div>
	
</div>
</div>
    <ToastContainer />
    </>
  )
}
export default Login;