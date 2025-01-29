import React from 'react'
import Header from "../components/Header";
import Navbar  from "../components/Navbar";
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import Feature from '../components/Feature';
import "./home.scss"

const Home = () => {
  return (
    <div className="home">
      <Navbar/>
      <Header/>
      <Announcement type={"Upper half"}/>
      <Feature/>
      <Announcement type={"Lower half"}/>
      <Footer />
    </div>
  )
}
export default Home