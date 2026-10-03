import { useSelector } from "react-redux";
import LatestJobCard from "./LatestJobCard";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.jobs);
  const navigate = useNavigate();

  return (
    <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <span className="text-sm font-semibold text-purple-600">
              FRESH OPPORTUNITIES
            </span>

            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Latest & top jobs
            </h2>

            <p className="mt-3 text-sm text-slate-500">
              Discover recently posted opportunities from companies
              looking for talented people.
            </p>
          </div>

          <button
            onClick={() => navigate("/jobs")}
            className="group flex items-center gap-2 text-sm font-semibold text-slate-900"
          >
            Explore all jobs

            <ArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </div>

        {/* Jobs */}
        {allJobs?.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white py-20 text-center">
            <p className="font-medium text-slate-500">
              No jobs available right now.
            </p>

            <p className="mt-1 text-sm text-slate-400">
              Check back soon for new opportunities.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {allJobs.slice(0, 6).map((item, index) => (
              <motion.div
                key={item?._id || index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                className="group transition-transform duration-300 hover:-translate-y-1"
              >
                <LatestJobCard job={item} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestJobs;