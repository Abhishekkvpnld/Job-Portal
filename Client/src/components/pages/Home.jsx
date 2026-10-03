import useGetAllJobs from "@/hooks/useGetAllJobs";
import Category from "../shared/Category";
import Footer from "../shared/Footer";
import HeroSection from "../shared/HeroSection";
import LatestJobs from "../shared/LatestJobs";
import Navbar from "../shared/Navbar";
import SlideIcons from "../shared/SlideIcons";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ArrowRight, Briefcase, CheckCircle2, Search, Sparkles, Users } from "lucide-react";
import { motion } from "framer-motion";
import CareerCTA from "../shared/CareerCTA ";

const Home = () => {
  useGetAllJobs();

  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen overflow-hidden bg-white text-slate-900">
      <Navbar />

      <main>
        <HeroSection />

        <SlideIcons />

        <Category />

        <LatestJobs />

        {/* CTA */}
        <CareerCTA />
      </main>

      <Footer />
    </div>
  );
};

export default Home;