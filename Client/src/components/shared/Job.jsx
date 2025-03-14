import { Bookmark } from "lucide-react"
import { Button } from "../ui/button"
import { Avatar, AvatarImage } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"


const Job = ({ job }) => {

    const navigate = useNavigate();

    const daysAgo = (time) => {
        const createdAt = new Date(time);
        const currentTime = new Date()

        const timeDifference = createdAt - currentTime;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60))
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
                duration: 0.5,
                ease: "easeInOut",
            }}
            className="p-5 rounded-md shadow-sm bg-white border border-gray-100 hover:shadow-md">
            <div className="flex items-center justify-between">
                <p className="font-semibold text-xs text-gray-500">{daysAgo(job?.createdAt) === 0 ? "Today" : `${daysAgo(job?.createdAt)} days ago`}</p>
                <Button variant="outline" className="rounded-full" size={"icon"}><Bookmark className="hover:scale-110 focus:scale-110 transition-all" /></Button>
            </div>


            <div className="flex items-center gap-2 my1">
                <Button className="p-5" variant="outline" size={"icon"}>
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </Button>

                <div>
                    <h1 className="font-semibold text-xl line-clamp-1">{job?.company?.name}</h1>
                    <p className="text-xs text-gray-500">India</p>
                </div>
            </div>

            <div>
                <h1 className="font-semibold text-lg my-2 line-clamp-1">{job?.title}</h1>
                <p className="text-sm text-slate-500 line-clamp-2">{job?.description}</p>
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
        </motion.div>
    )
}

export default Job