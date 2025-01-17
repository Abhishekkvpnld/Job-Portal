import { setSingleCompany } from "@/redux/companySlice";
import { COMPANY_API_END_POINT } from "@/utils/constants";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";




const useGetCompanyDetails = (companyId) => {
    const dispatch = useDispatch();

    const fetchSingleCompany = async () => {
        try {
            const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, { withCredentials: true });
            if (res?.data?.success) {
                dispatch(setSingleCompany(res?.data?.data));
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchSingleCompany();
    }, [companyId,dispatch])
};

export default useGetCompanyDetails;