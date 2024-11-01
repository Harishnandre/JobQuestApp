import React from 'react'
import "./App.css"
import Home from './components/Home'
import { BrowserRouter,Routes,Route, Router } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LoginRoute from './components/LoginRoute'
import JobsSection from './components/JobsSection'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import ForgetPassword from './components/ForgetPasssword'
import Jobdetails from './components/Jobdetails/Index'


const App = () => {
  return (
    <BrowserRouter>
     <Navbar/>
     <Routes>
      <Route exact path='/' Component={Home}/>
      <Route exact path='/login' Component={LoginRoute}/>
      <Route exact path='/jobs' Component={JobsSection}/>
      <Route exact path='/register' Component={Register}/>
      <Route exact path='/forget-password' Component={ForgetPassword}/>
      <Route exact path='/job-details/:JobId' Component={Jobdetails}/>
      <Route exact path='/dashboard' Component={Dashboard}/>
     </Routes>
     <Footer/>
    </BrowserRouter>
  )
}

export default App