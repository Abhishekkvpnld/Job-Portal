import { setCompanies } from "@/redux/companySlice";
import { setAllAppliedJobs } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constants";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";




const useGetAppliedJobs = () => {
    const dispatch = useDispatch();

    const fetchAllCompanies = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setAllAppliedJobs(res?.data?.data));
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        };
    }

    useEffect(() => {
        fetchAllCompanies();
    }, [])
}

export default useGetAppliedJobs