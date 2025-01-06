import { Badge } from "../ui/badge";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";


const AppliedJobTable = () => {
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
                        [1, 2, 3].map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{"20-01-2025"}</TableCell>
                                <TableCell>Google</TableCell>
                                <TableCell>Frontend Developer</TableCell>
                                <TableCell className="text-right"><Badge>Pending</Badge></TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable;