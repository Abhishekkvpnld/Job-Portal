import { useSelector } from "react-redux";
import LatestJobCard from "./LatestJobCard"



const LatestJobs = () => {

    // let random = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    const { allJobs } = useSelector((store) => store.jobs)

    return (
        <div className="max-w-5xl my-20 mx-auto">
            <h1 className="font-bold text-4xl">Explore <span className="text-red-700">Latest & Top </span>Jobs</h1>
            <div className="grid grid-cols-3  gap-6 my-5">
                {
                    allJobs.length === 0 ? <span>Job Not Available</span> :
                        allJobs.slice(0, 6).map((item, index) => (
                            <LatestJobCard key={index} job={item} />
                        ))
                }
            </div>
        </div>
    )
}

export default LatestJobs