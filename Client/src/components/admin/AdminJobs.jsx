import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { setSearchJob } from "@/redux/jobSlice";


const AdminJobs = () => {
  useGetAllAdminJobs();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  useEffect(() => {
      dispatch(setSearchJob(input));
  }, [input]);


  return (
      <div>
          <Navbar />

          <div className="max-w-6xl mx-8 my-10">
              <div className="flex items-center justify-between">
                  <Input onChange={(e) => setInput(e.target.value)} type="text" placeholder="Filter by name" className="w-fit" />
                  <Button onClick={() => navigate("/admin/jobs/create")}>New Jobs</Button>
              </div>
              <AdminJobsTable />
          </div>
      </div>
  )
}


export default AdminJobs