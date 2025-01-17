import { useSelector } from "react-redux";
import FilterCard from "../shared/FilterCard";
import Job from "../shared/Job";
import Navbar from "../shared/Navbar";


// const jobsArr = [1, 2, 3, 4, 5, 6, 7, 8]

const Jobs = () => {

  const { allJobs } = useSelector(store => store.jobs);
  console.log("✅✅✅✅✅✅✅✅✅✅,",allJobs)

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-2 p-3">
        <div className="flex gap-5">
          <div className="w-[17%]">
            <FilterCard />
          </div>

          {
            allJobs?.length <= 0 ? <span>Job Not Found</span> :
              <div className="flex-1 h-88vh overflow-y-auto pb-5">
                <div className="grid grid-cols-3 gap-4">
                  {
                    allJobs.map((job, index) => (
                      <div key={index}>
                        <Job  job={job} />
                      </div>
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