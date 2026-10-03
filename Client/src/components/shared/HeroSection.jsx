import { Search, Sparkles, ArrowRight, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  const [searchValue, setSearchValue] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchQuery(searchValue));
    navigate("/browse");
  };

  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-20 sm:px-6 lg:pt-28">

      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[10%] top-10 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />
        <div className="absolute right-[10%] top-20 h-72 w-72 rounded-full bg-purple-400/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-pink-300/10 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 shadow-sm"
        >
          <Sparkles size={15} />
          Connecting talent with opportunity
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto max-w-5xl text-4xl font-black tracking-tight text-slate-950 sm:text-6xl lg:text-7xl"
        >
          Find work that
          <br />

          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            moves you forward.
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base"
        >
          Discover meaningful opportunities from growing startups and
          established companies. Search, apply and take the next step
          in your career.
        </motion.p>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mx-auto mt-9 max-w-3xl"
        >
          <div className="flex flex-col gap-2 rounded-3xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-200/60 sm:flex-row sm:rounded-full">

            <div className="flex flex-1 items-center gap-3 px-4">
              <Search
                size={20}
                className="shrink-0 text-slate-400"
              />

              <input
                value={searchValue}
                onChange={(e) =>
                  setSearchValue(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    searchJobHandler();
                  }
                }}
                type="text"
                placeholder="Search for jobs, skills or keywords..."
                className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
            </div>

            <div className="hidden items-center gap-2 border-l px-4 sm:flex">
              <MapPin size={18} className="text-slate-400" />

              <span className="whitespace-nowrap text-sm text-slate-500">
                Anywhere
              </span>
            </div>

            <Button
              onClick={searchJobHandler}
              className="h-12 rounded-2xl bg-slate-950 px-7 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-600 sm:rounded-full"
            >
              Search Jobs
              <ArrowRight size={17} />
            </Button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mx-auto mt-12 grid max-w-2xl grid-cols-3 divide-x rounded-2xl border border-slate-200 bg-white/70 py-5 shadow-sm backdrop-blur"
        >
          <div>
            <p className="text-xl font-bold text-slate-900 sm:text-2xl">
              10K+
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Jobs
            </p>
          </div>

          <div>
            <p className="text-xl font-bold text-slate-900 sm:text-2xl">
              5K+
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Candidates
            </p>
          </div>

          <div>
            <p className="text-xl font-bold text-slate-900 sm:text-2xl">
              1K+
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Companies
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;