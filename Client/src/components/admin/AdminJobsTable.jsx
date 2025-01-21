import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Edit2, MoreHorizontal } from "lucide-react"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


const AdminJobsTable = () => {
    const navigate = useNavigate();
    const { allAdminJobs, searchJob } = useSelector(store => store.jobs);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);

    console.log(allAdminJobs,"✅✅✅")

    useEffect(() => {
        const filterJobs = allAdminJobs?.length >= 0 && allAdminJobs.filter((job) => {
            if (!searchJob) {
                return true;
            }

            return job?.title.toLowerCase().includes(searchJob.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJob.toLowerCase());
        });
        setFilterJobs(filterJobs)

    }, [allAdminJobs, searchJob]);

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent posted jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {filterJobs?.length <= 0 ? (
                        <span>You haven't registered any company yet...</span>
                    ) : (
                        filterJobs?.map((job) => (
                            <TableRow key={job._id}>
                                <TableCell>{job?.company?.name}</TableCell>
                                <TableCell>{job?.title}</TableCell>
                                <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent onClick={() => navigate(`/admin/companies/${job?._id}`)} className="w-28 hover:bg-blue-800 hover:text-white">
                                            <div className="flex items-center gap-2 cursor-pointer h-2">
                                                <Edit2 className="w-5 hover:text-white text-slate-500" />
                                                <span>Edit</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};


export default AdminJobsTable;