import { useSelector } from "react-redux";
import FilterCard from "../shared/FilterCard";
import Job from "../shared/Job";
import Navbar from "../shared/Navbar";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BriefcaseBusiness,
  Filter,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";
import JobNotFound from "./JobNotFound";

const Jobs = () => {
  const { allJobs, searchQuery } = useSelector((store) => store.jobs);

  const [filterData, setFilterData] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (!allJobs) {
      setFilterData([]);
      return;
    }

    if (searchQuery?.trim()) {
      const query = searchQuery.toLowerCase().trim();

      const filteredData = allJobs.filter((job) => {
        const title = job?.title?.toLowerCase() || "";
        const description = job?.description?.toLowerCase() || "";
        const location = job?.location?.toLowerCase() || "";
        const company = job?.company?.name?.toLowerCase() || "";

        return (
          title.includes(query) ||
          description.includes(query) ||
          location.includes(query) ||
          company.includes(query)
        );
      });

      setFilterData(filteredData);
    } else {
      setFilterData(allJobs);
    }
  }, [searchQuery, allJobs]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Background decoration */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-10%] top-[10%] h-72 w-72 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute right-[-10%] top-[40%] h-96 w-96 rounded-full bg-violet-500/5 blur-3xl" />
      </div>

      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* =====================================================
            PAGE HEADER
        ===================================================== */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-7"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

            {/* Heading */}
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
                <Sparkles className="h-3.5 w-3.5" />
                Discover your next opportunity
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Find your{" "}
                <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">
                  dream job
                </span>
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                Explore opportunities from companies that are looking for
                talented people like you.
              </p>
            </div>

            {/* Job count */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex w-fit items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                <BriefcaseBusiness className="h-5 w-5 text-blue-600" />
              </div>

              <div>
                <p className="text-lg font-bold text-slate-900">
                  {filterData?.length || 0}
                </p>

                <p className="text-xs font-medium text-slate-500">
                  {filterData?.length === 1 ? "Job available" : "Jobs available"}
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* =====================================================
            SEARCH STATUS
        ===================================================== */}
        <AnimatePresence>
          {searchQuery?.trim() && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              className="mb-5 overflow-hidden"
            >
              <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-blue-100 bg-blue-50/70 px-4 py-3 text-sm">
                <Search className="h-4 w-4 text-blue-600" />

                <span className="text-slate-600">
                  Showing results for
                </span>

                <span className="rounded-lg bg-white px-2.5 py-1 font-semibold text-blue-600 shadow-sm">
                  "{searchQuery}"
                </span>

                <span className="text-slate-500">
                  · {filterData?.length || 0} results
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* =====================================================
            MOBILE FILTER BUTTON
        ===================================================== */}
        <div className="mb-5 flex items-center justify-between md:hidden">
          <p className="text-sm font-medium text-slate-500">
            Browse available positions
          </p>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-600"
          >
            {showFilters ? (
              <X className="h-4 w-4" />
            ) : (
              <SlidersHorizontal className="h-4 w-4" />
            )}

            {showFilters ? "Close Filters" : "Filters"}
          </motion.button>
        </div>

        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}
        <div className="flex flex-col gap-6 md:flex-row md:items-start">

          {/* ===================================================
              FILTER SIDEBAR
          =================================================== */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden md:hidden"
              >
                <div className="rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
                  <FilterCard />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop filter */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden w-full shrink-0 md:block md:w-[220px] lg:w-[240px]"
          >
            <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
              <FilterCard />
            </div>
          </motion.aside>

          {/* ===================================================
              JOB RESULTS
          =================================================== */}
          <section className="min-w-0 flex-1">

            {/* Result header */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mb-5 flex items-center justify-between"
            >
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Latest opportunities
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  {filterData?.length || 0}{" "}
                  {filterData?.length === 1 ? "position" : "positions"} found
                </p>
              </div>

              <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-500 shadow-sm sm:flex">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                Live opportunities
              </div>
            </motion.div>

            {/* =================================================
                EMPTY STATE
            ================================================= */}
            {filterData?.length <= 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
                className="rounded-3xl border border-slate-200 bg-white shadow-sm"
              >
                <JobNotFound />
              </motion.div>
            ) : (
              /* ===============================================
                 JOB GRID
              =============================================== */
              <motion.div
                layout
                className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
              >
                <AnimatePresence mode="popLayout">
                  {filterData.map((job, index) => (
                    <motion.div
                      layout
                      key={job?._id || index}
                      initial={{
                        opacity: 0,
                        y: 30,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: -20,
                        scale: 0.97,
                      }}
                      transition={{
                        duration: 0.35,
                        delay: Math.min(index * 0.05, 0.4),
                        ease: "easeOut",
                      }}
                    >
                      <Job job={job} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default Jobs;