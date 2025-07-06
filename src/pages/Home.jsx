import React, { useEffect } from 'react'
import Nav from '../components/Nav';
import HeroSection from '../components/HeroSection';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import HowItWorks from '../components/HowItWorks';

const Home = () => {
  const { user } = useSelector((state) => state.loggedInUser)
  const navigate = useNavigate()
  
  useEffect(()=> {
      if(user && user?.role != 'user') navigate("/admin")
  },[])

  return (
    <div>
      <Nav/>
      <HeroSection/>
      <HowItWorks/>
    </div>
  )
}

export default Home
