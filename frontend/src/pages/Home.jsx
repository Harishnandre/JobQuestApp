import React from 'react'
import Hero from '../components/Hero'
import TopNiches from '../components/TopNiches'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import "./Home.css"
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import LoginRoute from '../components/LoginRoute/LoginRoute'

const Home = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Hero />} />
        <Route path='/login' element={<LoginRoute />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default Home


