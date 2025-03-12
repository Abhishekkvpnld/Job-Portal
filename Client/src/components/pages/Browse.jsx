import { useDispatch, useSelector } from "react-redux";
import Job from "../shared/Job";
import Navbar from "../shared/Navbar";
import { useEffect } from "react";
import { setSearchQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";


const Browse = () => {

    useGetAllJobs()
    const dispatch = useDispatch();
    const { allJobs } = useSelector(store => store.jobs);

    useEffect(() => {
        return () => {
            dispatch(setSearchQuery(""))
        }
    }, []);

    return (
        <div>
            <Navbar />
            <div className="mx-auto my-4 max-w-5xl p-2">
                <h1 className="font-bold text-xl text-slate-500">Search Results:({allJobs?.length})</h1>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {
                        allJobs.map((item) => (
                            <Job key={item?._id} job={item} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Browse;