import React from 'react'
import "./App.css"
import Home from './components/Home'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LoginRoute from './components/LoginRoute'
import JobsSection from './components/JobsSection'
import Register from './components/Register'
const App = () => {
  return (
    <BrowserRouter>
     <Navbar/>
     <Routes>
      <Route exact path='/' Component={Home}/>
      <Route exact path='/login' Component={LoginRoute}/>
      <Route exact path='/jobs' Component={JobsSection}/>
      <Route exact path='/register' Component={Register}/>
     </Routes>
     <Footer/>
     <Routes>
   
     </Routes>
    
    </BrowserRouter>
  )
}

export default App