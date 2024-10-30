import React from 'react'
import Hero from '../components/Hero'
import TopNiches from '../components/TopNiches'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import "./Home.css"
const Home = () => {
  return (
   <>
   <Navbar/>
   <Hero/>
   <TopNiches/>
   <Footer/>
   </>
  )
}

export default Home