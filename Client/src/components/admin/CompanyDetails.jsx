import { useEffect, useState } from "react"
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { ArrowBigLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constants";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";




const CompanyDetails = () => {

    const [loading, setLoading] = useState(false);
    const params = useParams();
    const { singleCompany } = useSelector(store => store.company)

    const navigate = useNavigate();
    const [input, setinput] = useState({
        name: "",
        description: "",
        location: "",
        website: "",
        file: null
    });

    const changeEventHandler = (e) => {
        setinput({ ...input, [e.target.name]: e.target.value })
    };


    const fileHandler = (e) => {
        const file = e.target.files[0];
        setinput({ ...input , file});

    };


    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData(); 
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("location", input.location);
        formData.append("website", input.website);

        if (input.file) {
            formData.append("file", input.file)
            console.log(input.file)
        };

        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            });
            if (res?.data?.success) {
                toast.success(res?.data?.message);
                navigate("/admin/companies")
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setinput({
            name: singleCompany.name || "",
            location: singleCompany.location || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            file: singleCompany.file || null
        });
    }, [singleCompany]);


    return (
        <div>
            <Navbar />

            <div className="mx-auto my-8 max-w-xl">
                <form onSubmit={submitHandler}>
                    <div className="p-7 flex items-center gap-4">
                        <Button onClick={() => navigate("/admin/companies")} variant="outline" className="flex items-center gap-2 font-semibold text-gray-500">
                            <ArrowBigLeft />
                            <span>Back</span>
                        </Button>
                        <h1 className="font-bold text-xl">Company Setup</h1>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>Company Name</Label>
                            <Input type="text" name="name" className="border border-slate-500 mt-1" onChange={changeEventHandler} value={input.name} />
                        </div>

                        <div>
                            <Label>Description</Label>
                            <Input type="text" className="border border-slate-500 mt-1" name="description" onChange={changeEventHandler} value={input.description} />
                        </div>

                        <div>
                            <Label>Website</Label>
                            <Input type="text" className="border border-slate-500 mt-1" name="website" onChange={changeEventHandler} value={input.website} />
                        </div>

                        <div>
                            <Label>Location</Label>
                            <Input type="text" className="border border-slate-500 mt-1" name="location" onChange={changeEventHandler} value={input.location} />
                        </div>

                        <div>
                            <Label>Company Logo</Label>
                            <Input onChange={fileHandler} type="file" className="border border-slate-500 mt-1" accept="image/*" name="location"  />
                        </div>
                    </div>
                    {
                        loading ? <Button className="w-full my-4 "><Loader2 className="animate-spin" /> Please wait...</Button> :
                            <Button type="submit" className="w-full mt-5">Update</Button>
                    }
                </form>
            </div>
        </div>
    )
}

export default CompanyDetails