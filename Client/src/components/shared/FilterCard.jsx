import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

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
    return (
        <div className="rounded-md bg-white p-3 w-full hover:shadow-md">
            <h1 className="text-xl font-bold">Filter Jobs</h1>
            <hr className="mt-3" />
            <RadioGroup>
                {
                    filterData.map((data, index) => (
                        <div key={index}>
                            <h1 className="text-lg font-bold text-gray-700">{data.filterType}</h1>
                            {
                                data?.options.map((opt, index) => (
                                    <div key={index} className="flex items-center my-1 space-x-2">
                                        <RadioGroupItem value={opt}/>
                                        <Label className="text-sm font-normal">{opt}</Label>
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}

export default FilterCard;