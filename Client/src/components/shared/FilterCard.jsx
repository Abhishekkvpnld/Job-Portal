import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";

const filterData = [
    {
        filterType: "Location",
        options: ["Kerala", "Bangalore", "Chennai", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Industry",
        options: ["Frontend Developer", "Backend Developer", "Fullstack Developer"]
    },
    {
        filterType: "Salary",
        options: ["0-10k", "11-40k", "41-80k", "81k-Above"]
    }
]

const FilterCard = () => {

    const dispatch = useDispatch();
    const [selectedValue, setSelectedValue] = useState("");
    const changeHandler = (value) => {
        setSelectedValue(value);
    };

    useEffect(() => {
        dispatch(setSearchQuery(selectedValue));
    }, [selectedValue]);

    return (
        <div className="rounded-md bg-white p-3 w-full hover:shadow-md">
            <h1 className="text-xl font-bold">Filter Jobs</h1>
            <hr className="mt-3" />
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {
                    filterData.map((data, index) => (
                        <div key={index}>
                            <h1 className="text-lg font-bold text-gray-700">{data.filterType}</h1>
                            {
                                data?.options.map((opt, i) => {

                                    const id = `id${index}-${i}`
                                    return (
                                        <div key={i} className="flex items-center my-1 space-x-2">
                                            <RadioGroupItem id={id} value={opt} />
                                            <Label htmlFor={id} className="text-sm font-normal">{opt}</Label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}

export default FilterCard;