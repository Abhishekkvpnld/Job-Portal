import { RadioGroup } from "../ui/radio-group";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";


const Signup = () => {
    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center mx-auto max-w-7xl ">
                <form action="" className="w-1/2 border border-gray-200 rounded-md p-4 my-8">
                    <h1 className="font-bold text-xl mb-2">Sign Up</h1>
                    <div className="my-2">
                        <Label>Full Name</Label>
                        <Input type="text" placeholder="Enter Name" />
                    </div>

                    <div className="my-2">
                        <Label>Email</Label>
                        <Input type="email" placeholder="Enter Email" />
                    </div>

                    <div className="my-2">
                        <Label>Phone Number</Label>
                        <Input type="number" placeholder="Enter Phone Number" />
                    </div>

                    <div className="my-2">
                        <Label>Password</Label>
                        <Input type="password" placeholder="Enter Password" />
                    </div>

                    <div className="flex items-center justify-between w-full">
                        <RadioGroup className="flex items-center gap-4 my-4">
                            <div className="flex items-center space-x-2">
                                <input type="radio" name="role" value={"student"} className="cursor-pointer" />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input type="radio" name="role" value={"recruiter"} className="cursor-pointer" />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>

                        <div className="flex items-center gap-1">
                            <Label>Profile</Label>
                            <input type="file" accept="image/*" className="cursor-pointer text-xs border" />
                        </div>

                    </div>

                    <Button type="submit" className="w-full my-4">Signup</Button>
                    <span className="text-sm">Already have an account? <Link to={"/login"} className="hover:underline font-semibold text-blue-700 ">Login</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Signup;