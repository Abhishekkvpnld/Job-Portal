import Category from "../shared/Category"
import Footer from "../shared/Footer"
import HeroSection from "../shared/HeroSection"
import LatestJobs from "../shared/LatestJobs"
import Navbar from "../shared/Navbar"


const Home = () => {
  return (
    <div>
        <Navbar/>
        <HeroSection/>
        <Category/>
        <LatestJobs/>
        <Footer/>
    </div>
  )
}

export default Home