import { Contact2, Edit, Mail } from "lucide-react"
import { Button } from "../ui/button"
import Navbar from "./Navbar"
import { Avatar, AvatarImage } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { Label } from "../ui/label"
import AppliedJobTable from "./AppliedJobTable"

const skills = ["CSS", 'HTML', "JavaScript", 'NodeJs', "ExpresJs"];
const isResume = true;

const Profile = () => {
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
                            <h1 className="text-xl font-medium">Full Name</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, tempore!</p>
                        </div>

                    </div>
                    <Button className="text-right hover:bg-blue-700 hover:text-white transition-all" title="Edit" variant="outline"><Edit className="hover:scale-110 transition" /></Button>
                </div>

                <div className="my-3">
                    <div className="flex items-center gap-2 my-2">
                        <Mail />
                        <span>abhishek@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-2 my-2 ">
                        <Contact2 />
                        <span>8684524652</span>
                    </div>
                </div>

                <div className="my-5">
                    <h1 className="font-semibold text-md">Skills</h1>
                    {
                        skills.length !== 0 ? skills.map((item, index) => <Badge className={"mx-1"} key={index}>{item}</Badge>) : "NA"
                    }
                </div>

                <div className="grid w-full bg-slate-100 max-w-sm items-center gap-1.5 border border-dashed border-slate-400 p-3 rounded-md">
                    <Label className="text-md font-bold">Resume</Label>
                    {
                        isResume ? <a target="_blank" className="hover:underline text-blue-700 font-semibold" href="">Abhishek Mern Stack</a> : <span>NA</span>
                    }
                </div>

            </div>
            <div className="max-w-4xl mx-auto bg-white rounded-2xl">
                <h1 className="font-bold text-lg">Applied Jobs</h1>
                <AppliedJobTable />
            </div>
        </div>
    )
}

export default Profile