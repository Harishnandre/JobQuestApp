
import React, { useState ,useContext} from 'react'
// import  './index.css'
import { useNavigate } from 'react-router-dom'
// import { Authcontext } from '../../components/contextAPI/Authcontext'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';  //for network request
//import { Link } from 'react-router-dom';
import './index.css'

const Register = ()=> {
  const [name ,setName]=useState("");
  const [role,setrole]=useState("");
  const [email ,setemail]=useState("");
  const [password ,setPassword]=useState("");
  const [phone ,setphone]=useState("");
  const [answer ,setanswer]=useState("");
  const [address,setaddress]=useState("");
//   const [firstNiche,setFirstNiche]=useState("");
//   const [secondNiche,setSecondNiche]=useState("");
//   const [thirdNiche,setThirdNiche]=useState("");
//   const [coverletter,setCoverletter]=useState("");
//   const [resume,setResume]=useState("");
//   const [auth,setauth]=useContext(Authcontext);
  const navigate=useNavigate();
 
//   const nichesArray = [
//      "Software Development",
//      "Web Development",
//      "Cybersecurity",
//      "Data Science",
//      "Artificial Intelligence",
//      "Cloud Computing",
//      "DevOps",
//      "Mobile App Development",
//      "Blockchain",
//      "Database Administration",
//      "Network Administration",
//      "UI/UX Design",
//      "Game Development",
//      "IoT (Internet of Things)",
//      "Big Data",
//      "Machine Learning",
//      "IT Project Management",
//      "IT Support and Helpdesk",
//      "Systems Administration",
//      "IT Consulting",
//    ];

 


// const resumehandler=(event)=>{
//      const file=event.target.files[0];//the event hold information about file,since files is an array-like object, and [0] a ccesses the first file in that array.
//      setResume(file);
// }
const handlerolechange=(event)=>{
     setrole(event.target.value);
};
//   const firstNichechange=(event)=>{
//     setFirstNiche(event.target.value);
//   };
//   const secondNichechange=(event)=>{
//      setSecondNiche(event.target.value);
//    };
//    const thirdNichechange=(event)=>{
//      setThirdNiche(event.target.value);
//    };
//    const handleCoverchange=(event)=>{
//      setCoverletter(event.target.value);
//    };
   const handlenameChange=(event)=>{
     setName(event.target.value);
   };
  const handleemailChange=(event)=>{
    setemail(event.target.value);
  };
  const handlepasswordChange=(event)=>{
    setPassword(event.target.value);
  };
 
  const handlephoneChange=(event)=>{
    setphone(event.target.value);
  };
  const handleaddressChange=(event)=>{
    setaddress(event.target.value);
  };
  const handleanswerChange=(event)=>{
    setanswer(event.target.value);
  };
  const handleSubmit= async(event)=>{
  event.preventDefault();
  console.log(event);
 try{   //to handle the response and error
const res=await  axios.post(`${import.meta.env.REACT_APP_API}/api/v1/auth/register`,{name,email,password,phone,address,answer});

if(res.data.success){
  toast.success(res.data.message);
  //tauqeer work for navigation
  setauth({
    ...auth,
  user:res.data.user,
  token:res.data.token
  });
  localStorage.setItem('auth',JSON.stringify(res.data));
  navigate('/');
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
 <div className="form-container">
    <h3>Create a new account</h3>
   <form action="#" onSubmit={handleSubmit} >
     <div className="registerbox">
     <div className="wrapper1">
     <div className='inputTag'>
          <p>Register As</p>
          <select value={role} onChange={handlerolechange}>
          <option value="">Select Role</option>
          <option value="Employer">Register as an Employer</option>
          <option value="Job Seeker">Register as a Job Seeker</option>
          </select>
     </div>
     <div className='inputTag'>
          <p>Name</p>
        <input type="text"onChange={handlenameChange} placeholder="Enter your name" required value={name} ></input>
      </div>
     </div>

     <div className="wrapper2">
     <div className='inputTag'>
          <p>Email</p>
        <input type="text"onChange={handleemailChange} placeholder="youremail@gmail.com" required value={email}></input>
      </div>
      <div className="inputTag">
      <p>Phone Number</p>
        <input type="text"onChange={handlephoneChange} placeholder="111-222-333" required value={phone}></input>
</div>
</div>

<div className="wrapper3">
     <div className='inputTag'>
          <p>Address</p>
        <input type="text"onChange={handleaddressChange} placeholder="Address" required  value={address}></input>
      </div>
      <div className="inputTag">
      <p>Password</p>
      <input type="password"onChange={handlepasswordChange} placeholder="Create password" required value={password}></input>
     
</div>
<div className='inputTag'>
          <p>Your Answer</p>
        <input type="text"onChange={handleanswerChange} placeholder="What is Your Favourite Actor" required value={answer}></input>
</div>
</div>

 {/* {
     role==="Job Seeker"&&(
          <>
          <div className="wrapper">
         <div className="inputTag">
          <label>Your first Niche</label>
          <div>
            <select value={firstNiche} onChange={firstNichechange}>
               <option value="">Your Niche</option>
                  {nichesArray.map((niche,index)=>{
                     return(
                         <option key={index} value={niche}>{niche}</option>
                    )
                  })}
               </select>   
          </div>
         </div>
         <div className="inputTag">
          <label>Your second Niche</label>
          <div>
            <select value={secondNiche} onChange={secondNichechange}>
               <option value="">Your Niche</option>
                  {nichesArray.map((niche,index)=>{
                    return(
                         <option key={index} value={niche}>{niche}</option>
                    )
                   
                  })}
               </select>   
          </div>
         </div>
         <div className="inputTag">
          <label>Your Third Niche</label>
          <div>
            <select value={thirdNiche} onChange={thirdNichechange}>
               <option value="">Your Niche</option>
                  {nichesArray.map((niche,index)=>{
                     return(
                         <option key={index} value={niche}>{niche}</option>
                    )
                  })}
               </select>   
          </div>
         </div>
    </div>
     <div className="wrapper">
   <div className='inputTag'>
     <label>Coverletter</label>
     <div>
<textarea value={coverletter} onChange={handleCoverchange} rows={10}/>
     </div> 
     </div>
   </div>

   <div className="wrapper">
   <div className='inputTag'>
   <div className='newone'>
   <label>Resume</label>
     <div>
 <input type="file"  value={resume} onChange={resumehandler} style={{border:"none"}}></input>
     </div> 
   </div>
     
     </div>
   </div>
</> )}  */}

<div className='wrapper4'>
  <div className="policy">
        
        <h3> <input type="checkbox"></input>I accept all terms & condition</h3>
      </div>
      <div className="input-box button">
        <input type="submit" className='reg-link'  value="Register Now"></input>
      </div>
      <div className="text">
        <h3>Already have an account? <a href="#">Login now</a></h3>
      </div>
  </div>
      </div>
    </form>
  </div>
  <ToastContainer />
  </>
    
  )
}
export default Register;