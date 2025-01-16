import { useNavigate } from "react-router-dom"
import Navbar from "../shared/Navbar"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { toast } from "sonner"
import axios from "axios"
import { COMPANY_API_END_POINT } from "@/utils/constants"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { setSingleCompany } from "@/redux/companySlice"




const CreateCompany = () => {

    const [companyName, setCompanyName] = useState();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const registerCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });

            if (res?.data?.success) {
                dispatch(setSingleCompany(res?.data?.data))
                toast.success(res?.data?.message);
                const companyId = res?.data?.data?._id;
                navigate(`/admin/companies/${companyId}`)
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        }
    }

    return (
        <div>
            <Navbar />

            <div className="max-w-4xl mx-auto">
                <div className="my-10">
                    <h1 className="text-2xl font-bold">Your Company Name</h1>
                    <p>What name would you like to give your company? You can update it anytime in the future.</p>
                </div>

                <Label>Company Name</Label>
                <Input
                    type="text"
                    className="my-2"
                    placeHolder="Google, Apple, Tcs..."
                    onChange={(e) => setCompanyName(e.target.value)}
                />

                <div className="my-5 gap-3 flex items-center">
                    <Button onClick={() => navigate("/admin/companies")}>Cancel</Button>
                    <Button onClick={registerCompany}>Continue</Button>
                </div>
            </div>
        </div>
    )
}

export default CreateCompany