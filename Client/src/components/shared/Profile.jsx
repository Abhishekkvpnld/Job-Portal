import { Contact2, Edit, Mail } from "lucide-react"
import { Button } from "../ui/button"
import Navbar from "./Navbar"
import { Avatar, AvatarImage } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { Label } from "../ui/label"
import AppliedJobTable from "./AppliedJobTable"
import { useState } from "react"
import UpdateProfileBox from "./UpdateProfileBox"
import { useSelector } from "react-redux"
import useGetAppliedJobs from "@/hooks/useGetAppliedJob"

const Profile = () => {

    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector((store) => store.auth);

    return (
        <div>
            <Navbar />
            <div className="max-w-4xl bg-white rounded-xl mx-auto my-4 p-6 border border-slate-200">

                <div className="flex justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbBNaU07xqYvyBtPMzrI2WmdQcyZz8hYg8FA&s" />
                        </Avatar>

                        <div>
                            <h1 className="text-xl font-medium">{user?.fullname}</h1>
                            <p>{user?.profile?.bio}</p>
                        </div>

                    </div>
                    <Button className="text-right hover:bg-blue-700 hover:text-white transition-all" title="Edit" variant="outline" onClick={() => setOpen(true)}><Edit className="hover:scale-110 transition" /></Button>
                </div>

                <div className="my-3">
                    <div className="flex items-center gap-2 my-2">
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className="flex items-center gap-2 my-2 ">
                        <Contact2 />
                        <span>{user?.phone}</span>
                    </div>
                </div>

                <div className="my-5">
                    <h1 className="font-semibold text-md">Skills</h1>
                    {
                        user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => <Badge className={"mx-1"} key={index}>{item}</Badge>) : "NA"
                    }
                </div>

                <div className="grid w-full bg-slate-50 max-w-sm items-center gap-1.5 border border-dashed border-slate-400 p-3 rounded-md">
                    <Label className="text-md font-bold">Resume</Label>
                    {
                        user?.profile?.resume ? <a target="_blank" className="hover:underline mr-auto text-blue-700 font-semibold" href={user?.profile?.resume}>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
                    }
                </div>
            </div>

            <div className="max-w-4xl mx-auto bg-white rounded-2xl">
                <h1 className="font-bold text-lg">Applied Jobs</h1>
                <AppliedJobTable />
            </div>

            <UpdateProfileBox open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile