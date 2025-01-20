import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import CompanyTable from "./CompanyTable";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchCompany } from "@/redux/companySlice";



const Companies = () => {

    useGetAllCompanies()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [input, setInput] = useState("");

    useEffect(() => {
        dispatch(setSearchCompany(input));
    }, [input]);

    return (
        <div>
            <Navbar />

            <div className="max-w-6xl mx-8 my-10">
                <div className="flex items-center justify-between">
                    <Input onChange={(e) => setInput(e.target.value)} type="text" placeholder="Filter by name" className="w-fit" />
                    <Button onClick={() => navigate("/admin/companies/create")}>New Company</Button>
                </div>
                <CompanyTable />
            </div>
        </div>
    )
}

export default Companies;