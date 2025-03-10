import { MoreHorizontal } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constants";

const ShortListStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {

    const { allApplicants } = useSelector(store => store.application);


    const statusHandler = async (status, id) => {
        try {
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status }, {
                withCredentials: true
            });

            if (res?.data?.success) {
                toast?.success(res?.data?.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message)
        }
    }

    return (
        <div className="overflow-scroll">
            <Table>
                <TableCaption>A List of recent applied user</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className={"text-right"}>Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>


                    {
                        allApplicants && allApplicants?.applications?.map((item) => (
                            <tr key={item?._id}>
                                <TableCell>{item?.applicant?.fullname}</TableCell>
                                <TableCell>{item?.applicant?.email}</TableCell>
                                <TableCell>{item?.applicant?.phone}</TableCell>
                                <TableCell className={"text-green-700 hover:underline font-semibold cursor-pointer"}>
                                    {
                                        item?.applicant?.profile?.resume ? <a href={item?.applicant?.profile?.resume} target="_blank" rel="noopenner noreferrer">{item?.applicant?.profile?.resumeOriginalName}</a> : <span>NA</span>
                                    }
                                </TableCell>
                                <TableCell>{item?.applicant?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className="float-right cursor-pointer w-fit mr-5 bg-blue-50 flex flex-col items-start p-4 space-y-2">
                                            {ShortListStatus.map((status, index) => (
                                                <div
                                                    onClick={() => statusHandler(status, item?._id)}
                                                    key={index}
                                                    className="flex items-center w-full cursor-pointer hover:underline"
                                                >
                                                    <span>{status}</span>
                                                </div>
                                            ))}
                                        </PopoverContent>
                                    </Popover>

                                </TableCell>
                            </tr>
                        ))
                    }
                </TableBody>

            </Table>
        </div>
    )
}

export default ApplicantsTable;