import { Badge } from "../ui/badge";


const LatestJobCard = () => {
    return (
        <div className="p-5 shadow-md rounded-md hover:shadow-xl bg-white border cursor-pointer border-gray-100">
            <div>
                <h1 className="font-medium text-lg">Company Name</h1>
                <p className="text-sm text-gray-500">India</p>
            </div>

            <div>
                <h1 className="font-bold text-lg my-1">Job Title</h1>
                <p className="text-gray-600 text-sm">Lorem ipsum aliquid perferendis sint officia suscipit incidunt ipsa dolorem hic dolore!</p>
            </div>

            <div className="flex items-center gap-2 mt-3">
                <Badge className={"font-bold text-blue-600"} variant={"ghost"}>15 Position</Badge>
                <Badge className={"font-bold text-violet-600"} variant={"ghost"}>Part Time</Badge>
                <Badge className={"font-bold text-red-600"} variant={"ghost"}>14LPA</Badge>
            </div>
        </div>
    )
}

export default LatestJobCard;