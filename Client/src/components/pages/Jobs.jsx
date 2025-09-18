import { useSelector } from "react-redux";
import FilterCard from "../shared/FilterCard";
import Job from "../shared/Job";
import Navbar from "../shared/Navbar";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Filter } from "lucide-react"; // icon for mobile button
import JobNotFound from "./JobNotFound";

const Jobs = () => {
  const { allJobs, searchQuery } = useSelector((store) => store.jobs);
  const [filterData, setFilterData] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const filteredData = allJobs.filter(
        (job) =>
          job.title.toLowerCase().includes(query) ||
          job.description.toLowerCase().includes(query) ||
          job.location.toLowerCase().includes(query)
      );
      setFilterData(filteredData);
    } else {
      setFilterData(allJobs);
    }
  }, [searchQuery, allJobs]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-4 px-3 w-full flex-1">
        <div className="flex flex-col md:flex-row gap-5">
          {/* Mobile Toggle Button */}
          <div className="md:hidden flex justify-end mb-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-lg shadow hover:bg-gray-300"
            >
              <Filter size={18} />
              <span>Filters</span>
            </button>
          </div>

          {/* Sidebar - shown always on desktop, toggle on mobile */}
          <div
            className={`${showFilters ? "block" : "hidden"
              } md:block w-full md:w-[20%]`}
          >
            <FilterCard />
          </div>

          {/* Jobs Section */}
          {filterData?.length <= 0 ? (
            <div className="flex-1 flex items-center justify-center text-gray-600 font-medium text-lg">
              <JobNotFound />
            </div>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filterData.map((job, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -100 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
