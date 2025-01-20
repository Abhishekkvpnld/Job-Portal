import { Avatar, AvatarImage } from "@radix-ui/react-avatar"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Edit2, MoreHorizontal } from "lucide-react"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


const CompanyTable = () => {

    const navigate = useNavigate();
    const { companies, searchCompany } = useSelector(store => store.company);
    const [filter, setFilter] = useState(companies);

    useEffect(() => {
        const filterCompany = companies?.length >= 0 && companies.filter((company) => {
            if (!searchCompany) {
                return true;
            }

            return company?.name.toLowerCase().includes(searchCompany.toLowerCase())
        });
        setFilter(filterCompany)

    }, [companies, searchCompany]);

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
                    {filter?.length <= 0 ? (
                        <span>You haven't registered any company yet...</span>
                    ) : (
                        filter?.map((company) => (
                            <TableRow key={company._id}>
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage
                                            className="w-9 h-9 rounded-full"
                                            src={company?.logo}
                                        />
                                    </Avatar>
                                </TableCell>
                                <TableCell>{company?.name}</TableCell>
                                <TableCell>{company?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent  onClick={()=>navigate(`/admin/companies/${company._id}`)}  className="w-28 hover:bg-blue-800 hover:text-white">
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

export default CompanyTable;