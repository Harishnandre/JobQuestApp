import { createContext, useContext, useEffect, useState } from "react";
import { Authcontext } from "./Authcontext";
import { toast } from "react-toastify";
import axios from "axios";

export const Companycontext = createContext({
   companyData: [],
   setCompanyData: () => { },
   getAllCompany:()=>{}
});

const CompanycontextProvider = ({ children }) => {
   const [auth]=useContext(Authcontext);
   const {token}=auth;
   const [companyData, setCompanyData] = useState([]);
  /// console.log(token);

  useEffect(() => {
   // Only call getAllCompany when token is available
   if (token) {
      getAllCompany();
   }
}, [token]);
  
   const getAllCompany = async (req, res) => {
      try {
         //console.log(token);
         const res = await axios.get('http://localhost:5000/api/v1/company/get', {
            withCredentials: true,
            headers: {
               'Authorization': `Bearer ${token}` // Add the token here
            }
         });
         if (res?.data?.success) {
            setCompanyData(res.data.companies);
         }else{
            toast.error(res.data.message);
         }
      
         }catch (error) {
         console.error("Error during rendering of Company:", error);
         if (error.response) {
            toast.error(error.response.data.message);
         } else {
            toast.error("Company rendering failed. Please try again later.");
         }
         }
         }
   

   return (
      <Companycontext.Provider value={{ companyData, setCompanyData,getAllCompany }}>
         {children}
      </Companycontext.Provider>
   );
}

export default CompanycontextProvider;