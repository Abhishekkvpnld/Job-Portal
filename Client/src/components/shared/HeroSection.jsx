import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {

  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchQuery(searchValue));
    navigate("/browse")
  }

  return (
    <div className="text-center mt-2">
      <div className="flex flex-col gap-4 my-5">
        <span className="mx-auto font-medium text-sm shadow-md px-4 py-2 bg-slate-100 text-red-600 rounded-full">Connecting Talent with Opportunity.</span>
        <h1 className="text-4xl font-bold mt-2">Search , Apply & <br /> Get Your <span className="text-purple-800">Dream job</span></h1>
        <p className="px-3 text-xs">Empowering careers and transforming futures by seamlessly connecting exceptional talent with limitless opportunities.</p>

        <div className="flex pl-3 w-[50%] border shadow-md border-gray-200 rounded-full items-center gap-4 mx-auto">
          <input onChange={(e) => setSearchValue(e.target.value)} type="text" placeholder="Find Your Dream Jobs" className="w-full outline-none border-none" />
          <Button className="rounded-r-full" onClick={searchJobHandler}>
            <Search className="h-5 w-5 cursor-pointer" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HeroSection;