import Category from "../shared/Category"
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
    </div>
  )
}

export default Home