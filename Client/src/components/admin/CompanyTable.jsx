import { Avatar, AvatarImage } from "@radix-ui/react-avatar"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Edit2, MoreHorizontal } from "lucide-react"




const CompanyTable = () => {
    return (
        <div>
            <Table>
                <TableCaption>A list of your recent registered companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    <TableCell>
                        <Avatar >
                            <AvatarImage className="w-9 h-9 rounded-full" src={"https://img.freepik.com/free-vector/abstract-company-logo_53876-120501.jpg"} />
                        </Avatar>
                    </TableCell>
                    <TableCell>Company Name</TableCell>
                    <TableCell>16-01-2025</TableCell>
                    <TableCell className="text-right cursor-pointer">
                        <Popover>
                            <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                            <PopoverContent className="w-28">
                                <div className="flex items-center gap-2 cursor-pointer">
                                    <Edit2 className="w-5 text-slate-500"/>
                                    <span>Edit</span>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </TableCell>
                </TableBody>
            </Table>
        </div>
    )
}

export default CompanyTable