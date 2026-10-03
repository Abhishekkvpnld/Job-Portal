import { motion } from "framer-motion";
import {
  SearchX,
  Search,
  BriefcaseBusiness,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const JobNotFound = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="relative flex min-h-[60vh] items-center justify-center overflow-hidden px-4 py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />

      <motion.div
        className="relative z-10 mx-auto max-w-lg text-center"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {/* Icon */}
        <motion.div
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60"
          initial={{ scale: 0.7, rotate: -8 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.2,
            type: "spring",
            stiffness: 180,
          }}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50">
            <SearchX className="h-7 w-7 text-blue-600" />
          </div>
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm"
        >
          <Search className="h-4 w-4 text-blue-500" />
          No matching jobs
        </motion.div>

        {/* Heading */}
        <motion.h2
          className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          We couldn't find
          <span className="block bg-gradient-to-r from-blue-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">
            what you're looking for
          </span>
        </motion.h2>

        {/* Description */}
        <motion.p
          className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-500 sm:text-base"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Try changing your search keywords, location, category, or filters
          to discover more opportunities.
        </motion.p>

        {/* Suggestions */}
        <motion.div
          className="mt-7 flex flex-wrap justify-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          {["Try another keyword", "Remove filters", "Browse all jobs"].map(
            (item, index) => (
              <motion.div
                key={item}
                whileHover={{ y: -2 }}
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-600"
              >
                {item}
              </motion.div>
            )
          )}
        </motion.div>

        {/* Action */}
        <motion.button
          onClick={() => navigate("/jobs")}
          className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-600 hover:shadow-blue-500/25"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileTap={{ scale: 0.97 }}
        >
          <BriefcaseBusiness className="h-4 w-4" />
          Browse All Jobs
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default JobNotFound;