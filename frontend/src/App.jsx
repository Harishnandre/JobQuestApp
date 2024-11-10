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

import Jobform from './components/Jobform'
import UpdateJobs from './components/Updatejobs'

import CompanycontextProvider from './components/ContextAPI/Companycontext'
import QuizPage from './components/Assesment'
import Aboutus from './components/Aboutus'
import Contactus from './components/Contactus'




const App = () => {
  return (
    <AuthcontextProvider>
      <CompanycontextProvider>
<BrowserRouter>
<div className="app-container">
     <Navbar/>
     <main className="maincontent">
     <Routes>
      <Route exact path='/' Component={Home}/>
      <Route exact path='/login' Component={LoginRoute}/>
      <Route exact path='/about' Component={Aboutus}/>
      <Route exact path='/contact' Component={Contactus}/>
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
     <Route exact path='/admin/companies/update/:id' Component={UpdateCompany}/>
     <Route exact path='/admin/jobs/createjob' Component={Jobform}/>
     <Route exact path='/admin/jobs/updatejob' Component={UpdateJobs}/>
     <Route exact path='/practice' Component={QuizPage}/>
     <Route path='*' Component={NotFound}/>

     </Routes>
     </main>
     <Footer/>
     </div>
    </BrowserRouter>
    </CompanycontextProvider>
    </AuthcontextProvider>
    
  )
}

export default App