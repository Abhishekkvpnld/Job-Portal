import { useSelector } from "react-redux";
import FilterCard from "../shared/FilterCard";
import Job from "../shared/Job";
import Navbar from "../shared/Navbar";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";


const Jobs = () => {

  const { allJobs, searchQuery } = useSelector(store => store.jobs);
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    if (searchQuery) {
      const filteredData = allJobs.filter((job) => {
        const query = searchQuery.toLowerCase();
        return (
          job.title.toLowerCase().includes(query) ||
          job.description.toLowerCase().includes(query) ||
          job.location.toLowerCase().includes(query)
        );
      });

      setFilterData(filteredData)
    } else {
      setFilterData(allJobs)
    }
  }, [searchQuery, allJobs]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-2 p-3">
        <div className="flex gap-5">
          <div className="w-[17%]">
            <FilterCard />
          </div>

          {
            filterData?.length <= 0 ? <span>Job Not Found</span> :
              <div className="flex-1 h-88vh overflow-y-auto pb-5">
                <div className="grid grid-cols-3 gap-4">
                  {
                    filterData.map((job, index) => (
                      <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -100 }}
                        transition={{ duration: 0.3}}
                        key={index}>
                        <Job job={job} />
                      </motion.div>
                    ))
                  }
                </div>
              </div>
          }
        </div>
      </div>

    </div>
  )
}

export default Jobs;