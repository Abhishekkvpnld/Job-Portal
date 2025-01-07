import { Badge } from "../ui/badge";
import { Button } from "../ui/button";


const JobDescription = () => {

    let isApplied = false;

    return (
        <div className="max-w-5xl my-9 mx-auto">
            <div className="flex items-center justify-between">

                <div>
                    <h1 className="font-bold text-xl">Title</h1>
                    <div className="flex items-center gap-2 mt-2">
                        <Badge className={"font-bold text-blue-600"} variant={"ghost"}>5 Position</Badge>
                        <Badge className={"font-bold text-violet-600"} variant={"ghost"}>Part Time</Badge>
                        <Badge className={"font-bold text-red-600"} variant={"ghost"}>14LPA</Badge>
                    </div>
                </div>
                <Button
                    disabled={isApplied}
                    className={`rounded-lg px-10 ${isApplied ? "cursor-not-allowed bg-slate-700 text-white" : "bg-blue-700 transition text-white hover:bg-blue-800"}`}
                >
                    {isApplied ? "Already Applied" : "Apply"}
                </Button>
            </div>

            <h1 className="font-medium py-4 border-b-2 border-b-gray-300">Job Description</h1>
            <div className="my-2">
                <h1 className="font-bold my-1">Role:<span className="font-normal text-gray-800 pl-4">Frontend Developer</span></h1>
                <h1 className="font-bold my-1">Location:<span className="font-normal text-gray-800 pl-4">Bangalore</span></h1>
                <h1 className="font-bold my-1">Description:<span className="font-normal text-gray-800 pl-4">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam, facilis. Obcaecati, consequatur accusantium. Optio ab nam delectus molestiae minus sed praesentium repellat dolor veritatis blanditiis. Soluta tempore, quos qui atque commodi at, consequuntur numquam dolorem assumenda corporis quasi blanditiis quas provident sit rem consequatur exercitationem accusantium molestias. Repellat, reprehenderit praesentium!</span></h1>
                <h1 className="font-bold my-1">Experience:<span className="font-normal text-gray-800 pl-4">4 Years</span></h1>
                <h1 className="font-bold my-1">Salary:<span className="font-normal text-gray-800 pl-4">10LPA</span></h1>
                <h1 className="font-bold my-1">Total Applicants:<span className="font-normal text-gray-800 pl-4">155</span></h1>
                <h1 className="font-bold my-1">Posted Date:<span className="font-normal text-gray-800 pl-4">07-01-2025</span></h1>
            </div>
        </div>
    )
}

export default JobDescription;