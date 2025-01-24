import { useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { JOB_API_END_POINT } from "@/utils/constants";
import { Loader2 } from "lucide-react";



const PostJob = () => {


    const navigate = useNavigate();
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });

    const [loading, setLoading] = useState(false);

    const { companies } = useSelector(store => store.company);

    const onChangeHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    };


    const handleChangeCompanyId = (value) => {
        const selectedCompany = companies?.find((company) => company.name.toLowerCase() === value);
        setInput({ ...input, companyId: selectedCompany?._id });
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`,input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })

            if (res?.data?.success) {
                navigate("/admin/jobs");
                toast.success(res?.data?.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div >
            <Navbar />
            <div className="my-4 w-screen flex items-center justify-center flex-col">
                <h1 className="text-3xl font-bold text-gray-500">Create New Job</h1>
                <form onSubmit={handleSubmit} className="max-w-7xl w-[50%] bg-white shadow-lg rounded-md my-3 border border-gray-200 p-6">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <Label>Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={onChangeHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>

                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={onChangeHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>

                        <div>
                            <Label>Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={onChangeHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>

                        <div>
                            <Label>Salary</Label>
                            <Input
                                type="text"
                                name="salary"
                                value={input.salary}
                                onChange={onChangeHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>

                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={onChangeHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>

                        <div>
                            <Label>Job Type</Label>
                            <Input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={onChangeHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>

                        <div>
                            <Label>Experience</Label>
                            <Input
                                type="text"
                                name="experience"
                                value={input.experience}
                                onChange={onChangeHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>

                        <div>
                            <Label>No of Positions</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={onChangeHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>

                        {
                            companies && companies.length > 0 && (
                                <Select onValueChange={handleChangeCompanyId}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={"Select a Company"} />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectGroup>
                                            {companies.map((company) => (
                                                <SelectItem
                                                    key={company._id}
                                                    value={company.name.toLowerCase()}
                                                    className="p-2 font-semibold text-blue-700"
                                                >
                                                    {company.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )
                        }


                    </div>


                    {
                        loading ? <Button className="w-full my-4 "><Loader2 className="animate-spin" /> Please wait...</Button> :
                            <Button type="submit" className="w-full my-4">Post New Job</Button>
                    }

                    {
                        companies.length === 0 && <p className="text-xs text-red-600 text-center my-1 font-bold">&#9733; Please register a company first, before posting a jobs</p>
                    }
                </form>
            </div>
        </div>
    )
}

export default PostJob;