import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";


const AppliedJobTable = () => {

    const { allAppliedJobs } = useSelector(store => store.jobs)

    return (
        <div>
            <Table>
                <TableCaption>List of Your Applied Jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAppliedJobs.length <= 0 ? <span className="text-slate-400 font-semibold">You haven't applied any job yet.</span> : allAppliedJobs?.map((item) => (
                            <TableRow key={item?._id}>
                                <TableCell>{item?.createdAt.split("T")[0]}</TableCell>
                                <TableCell>{item?.job?.company?.name}</TableCell>
                                <TableCell>{item?.job?.title}</TableCell>
                                <TableCell className="text-right"><Badge className={`${item?.status === "rejected" ? "bg-red-700" : item?.status === "pending" ? "bg-orange-400" : "bg-green-600"}`}>{item?.status}</Badge></TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable;