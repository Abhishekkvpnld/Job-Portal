import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Edit2, Eye, MoreHorizontal } from "lucide-react"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


const AdminJobsTable = () => {
    const navigate = useNavigate();
    const { allAdminJobs, searchJob } = useSelector(store => store.jobs);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);


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
        <div className="overflow-scroll">
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
                                        <PopoverContent className="w-32 mr-6">
                                            <div onClick={() => navigate(`/admin/companies/${job?._id}`)} className="flex items-center gap-2 cursor-pointer h-2 hover:scale-110 transform ">
                                                <Edit2 className="w-5 hover:text-white text-slate-500" />
                                                <span>Edit</span>
                                            </div>

                                            <div onClick={() => navigate(`/admin/jobs/${job?._id}/applicants`)} className="flex items-center w-fit gap-2 cursor-pointer mt-4 hover:scale-105 transform">
                                                <Eye className="w-5 hover:text-white text-slate-500" />
                                                <span>Applicants</span>
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