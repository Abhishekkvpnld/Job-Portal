import { setAllJobs } from "@/redux/jobSlice"
import { JOB_API_END_POINT } from "@/utils/constants"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"


const useGetAllJobs = () => {

    const dispatch = useDispatch();
    const { searchQuery } = useSelector(store => store.jobs)

    const fetchAllJobs = async () => {
        try {
            const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchQuery}`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setAllJobs(res?.data?.data));
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchAllJobs();
    }, [])
}

export default useGetAllJobs