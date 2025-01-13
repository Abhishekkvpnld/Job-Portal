import { Bookmark } from "lucide-react"
import { Button } from "../ui/button"
import { Avatar, AvatarImage } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { useNavigate } from "react-router-dom"



const Job = ({ job }) => {

    const navigate = useNavigate();

    return (
        <div className="p-5 rounded-md shadow-sm bg-white border border-gray-100 hover:shadow-md">
            <div className="flex items-center justify-between">
                <p className="font-semibold text-xs text-gray-500">10+ days ago</p>
                <Button variant="outline" className="rounded-full" size={"icon"}><Bookmark className="hover:scale-110 focus:scale-110 transition-all" /></Button>
            </div>


            <div className="flex items-center gap-2 my1">
                <Button className="p-5" variant="outline" size={"icon"}>
                    <Avatar>
                        <AvatarImage src={"https://img.freepik.com/free-vector/abstract-company-logo_53876-120501.jpg"} />
                    </Avatar>
                </Button>

                <div>
                    <h1 className="font-semibold text-xl">{job?.company?.name}</h1>
                    <p className="text-xs text-gray-500">India</p>
                </div>
            </div>

            <div>
                <h1 className="font-semibold text-lg my-2">{job?.title}</h1>
                <p className="text-sm text-slate-500">{job?.description}</p>
            </div>

            <div className="flex items-center gap-2 mt-2">
                <Badge className={"font-bold text-blue-600"} variant={"ghost"}>{job?.position} Position</Badge>
                <Badge className={"font-bold text-violet-600"} variant={"ghost"}>{job?.jobType}</Badge>
                <Badge className={"font-bold text-red-600"} variant={"ghost"}>{job?.salary}LPA</Badge>
            </div>

            <div className="flex items-center gap-3 mt-2">
                <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline" className="text-xs">Details</Button>
                <Button className="bg-green-700 text-xs">Save For Later</Button>
            </div>
        </div>
    )
}

export default Job