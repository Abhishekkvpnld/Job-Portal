import { RadioGroup } from "../ui/radio-group";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";


const Signup = () => {

    const [input, setInput] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });

    const onChangeValueController = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const fileHandler = (e) => {
        setInput({ ...input, file: e.target.files[0] })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(input)
    }

    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center mx-auto max-w-7xl ">
                <form onSubmit={handleSubmit} className="w-1/2 border border-gray-200 rounded-md p-4 my-8">
                    <h1 className="font-bold text-xl mb-2">Sign Up</h1>
                    <div className="my-2">
                        <Label>Full Name</Label>
                        <Input name="fullName" value={input.fullName} onChange={onChangeValueController} type="text" placeholder="Enter Name" />
                    </div>

                    <div className="my-2">
                        <Label>Email</Label>
                        <Input value={input.email} onChange={onChangeValueController} name="email" type="email" placeholder="Enter Email" />
                    </div>

                    <div className="my-2">
                        <Label>Phone Number</Label>
                        <Input value={input.phoneNumber} onChange={onChangeValueController} name="phoneNumber" type="number" placeholder="Enter Phone Number" />
                    </div>

                    <div className="my-2">
                        <Label>Password</Label>
                        <Input value={input.password} onChange={onChangeValueController} name="password" type="password" placeholder="Enter Password" />
                    </div>

                    <div className="flex flex-col lg:flex-row items-center justify-between w-full">
                        <RadioGroup className="flex items-center gap-4 my-4">
                            <div className="flex items-center space-x-2">
                                <input checked={input.role === "student"} onChange={onChangeValueController} type="radio" name="role" value={"student"} className="cursor-pointer" />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input checked={input.role === "recruiter"} onChange={onChangeValueController} type="radio" name="role" value={"recruiter"} className="cursor-pointer" />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>

                        <div className="flex items-center gap-1">
                            <Label>Profile</Label>
                            <input onChange={fileHandler} type="file" name="file" accept="image/*" className="cursor-pointer text-xs border" />
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