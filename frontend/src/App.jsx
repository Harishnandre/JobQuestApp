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
import Jobdetails from './components/Jobdetails'
import AuthcontextProvider from './components/ContextAPI/Authcontext'
import SearchResults from './components/SearchResults'
import NotFound from './components/NotFound'
import RecommendedJobs from './components/jobrecommendation'
import Companies from './components/Companies'
import Jobs from './components/Jobs'
import CompanyList from './components/companylists'
import UpdateCompany from './components/Updatecompany'



const App = () => {
  return (
    <AuthcontextProvider>
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
      <Route exact path='/jobs-search/:searchTerm' Component={SearchResults} />
     <Route exact path='/recommended-jobs' Component={RecommendedJobs}/>
     <Route exact path='/admin/companies' Component={Companies}/>
     <Route exact path='/admin/jobs' Component={Jobs}/>
     <Route exact path='/admin/companies/create' Component={CompanyList}/>
     <Route exact path='/admin/companies/update' Component={UpdateCompany}/>


      <Route path='*' Component={NotFound}/>

     </Routes>
     <Footer/>
    </BrowserRouter>
    </AuthcontextProvider>
    
  )
}

export default App