import { setAllAdminJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constants";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";



const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();

    const fetchAllJobs = async () => {
        try {
            const res = await axios.get(`${JOB_API_END_POINT}/getAdminJob`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setAllAdminJobs(res.data.data));
            }

        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        };
    }

    useEffect(() => {
        fetchAllJobs();
    }, [])
}

export default useGetAllAdminJobs;