import React, { useState } from 'react'
import './index.css';
import {ToastContainer, toast} from 'react-toastify'
// import axios from 'axios';  //for network request
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 

 const Forgetpassword=()=> {
  const navigate=useNavigate();
  const [email ,setemail]=useState("");

  const [newPassword ,setnewPassword]=useState("");
  const [answer ,checkanswer]=useState("");
  const handleemailChange=(event)=>{
    setemail(event.target.value);
  };
  const handleresetpasswordChange=(event)=>{
    setnewPassword(event.target.value);
  };
  const handleanswerChange=(event)=>{
    checkanswer(event.target.value);
  };
  const handleSubmit= async(event)=>{
    event.preventDefault();
    // console.log(event);
    const formData = {
      
      newPassword,
      email,
      answer,
    };
  
    console.log("Form Data:", formData);




   try{   //to handle the response and error
  const res=await  axios.patch('http://localhost:5000/api/v1/user/forget-password',formData);
  console.log(res);
  
  if(res.data.success){
    toast.success(res.data.message);
    setTimeout(() => {
      navigate('/login'); // Change '/dashboard' to the route you want to navigate to
    }, 1000);
  }
  else{
    toast.error(res.data.message);
  }
  
   }
   catch(error){ 
  //   console.log(error.response.data)
  console.log(error);
    toast.error("Incorrect Answer or email");
   }
    
    };

      return (
        <>
     <div className="form-container1">
        <h3>Reset Password</h3>
       <form action="#" onSubmit={handleSubmit} >
         <div className="registerbox1">
         <div className="wrapper4">
         <div className='inputTags'>
              <label>Email</label>
            <input type="text"onChange={handleemailChange} placeholder="youremail@gmail.com" required value={email}></input>
          </div>
    </div>
    
    <div className="wrapper5">
    <div className='inputTags'>
              <label>Your Answer</label>
            <input type="text"onChange={handleanswerChange} placeholder="What is Your Favourite Actor" required value={answer}></input>
    </div>
    </div>
    <div className="wrapper6">
          <div className="inputTags">
          <label >New Password</label>
          <input type="password"onChange={handleresetpasswordChange} placeholder="Create password" required value={newPassword}></input>
         
    </div>
    </div>
    <div className="wrapper7 button">
        <input type="submit" className='reg-link'  value="Reset Now"></input>
      </div>
          </div>
        </form>
      </div>
      <ToastContainer />
      </>
        
      )
}
export default Forgetpassword;