import React from 'react'
import Hero from '../../components/herosection/Hero'
import TopNiches from '../../components/TopNichessection/TopNiches'
import Navbar from '../../components/Navbarsection/Navbar'
import "./Home.css"
import Footer from '../../components/Footersection/Footer'
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