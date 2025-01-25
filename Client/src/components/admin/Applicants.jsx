import { useEffect } from "react";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constants";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";



const Applicants = () => {

    const dispatch = useDispatch()
    const params = useParams();
    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
                if (res?.data?.success) {
                    dispatch(setAllApplicants(res?.data?.data))
                }
            } catch (error) {
                console.log(error)
                toast.error(error?.response?.data?.message)
            }
        }

        fetchApplicants();

    }, []);

    return (
        <div>
            <Navbar />
            <div className="max-w-6xl mx-auto p-3 ml-2">
                <h1 className="mx-auto font-bold text-2xl">Applicants (3)</h1>
                <ApplicantsTable />
            </div>
        </div>
    )
}

export default Applicants;