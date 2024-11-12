
import { ToastContainer } from "react-toastify"
import Hero from "../Hero"
import TopNiches from "../TopNiches"
import { Authcontext } from "../ContextAPI/Authcontext";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
const Home = () => {
  let [auth,setauth,isLoggedIn,setisLoggedIn]=useContext(Authcontext);
const { user } = auth || {};
  if(user?.role === "Recruiter"){
    return <Navigate to='/dashboard'/>
   }
     return( <>
       <Hero/>
       <TopNiches></TopNiches>
       <ToastContainer/>
     </>
     )
}
export default Home