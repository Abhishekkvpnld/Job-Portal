import { setCompanies } from "@/redux/companySlice";
import { COMPANY_API_END_POINT } from "@/utils/constants";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";




const useGetAllCompanies = () => {
    const dispatch = useDispatch();

    const fetchAllCompanies = async () => {
        try {
            const res = await axios.get(`${COMPANY_API_END_POINT}/get`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setCompanies(res.data.data));
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

export default useGetAllCompanies