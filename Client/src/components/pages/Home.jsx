import useGetAllJobs from "@/hooks/useGetAllJobs"
import Category from "../shared/Category"
import Footer from "../shared/Footer"
import HeroSection from "../shared/HeroSection"
import LatestJobs from "../shared/LatestJobs"
import Navbar from "../shared/Navbar"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import SlideIcons from "../shared/SlideIcons"


const Home = () => {

  useGetAllJobs();

  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth)

  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies"); 
    }
  }, []);

  return (
    <div>
      <Navbar />
      <HeroSection />
      <SlideIcons/>
      <Category />
      <LatestJobs />
      <Footer />
    </div>
  )
}

export default Home