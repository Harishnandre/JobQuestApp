import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
const ProtectedRoute = () => {
    const storedData = JSON.parse(localStorage.getItem("auth"));
    if(!storedData){
         alert("Please Login")
        return  <Navigate to='/login' replace/>
    }
};

export default ProtectedRoute;
