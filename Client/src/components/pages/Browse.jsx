import Job from "../shared/Job";
import Navbar from "../shared/Navbar";


const array = [1, 2, 3, 4, 5]

const Browse = () => {
    return (
        <div>
            <Navbar />
            <div className="mx-auto my-4 max-w-7xl p-2">
                <h1 className="font-bold text-xl text-slate-500">Search Results:({array.length})</h1>
                <div className="grid grid-cols-3 gap-4">
                    {
                        array.map((item, index) => (
                            <Job key={index} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Browse;