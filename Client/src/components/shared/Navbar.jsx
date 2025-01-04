import { LogOut, User2 } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Link } from "react-router-dom";



const Navbar = () => {


    const user = false

    return (
        <div className="bg-white">

            <div className="flex items-center justify-between px-10 py-1">
                <div>
                    <Link to={"/"}><h1 className="text-2xl font-bold rounded-lg cursor-pointer  text-orange-600">Find<span className="text-black">IT</span></h1></Link>
                </div>

                <div className="flex items-center gap-11">
                    <ul className="flex items-center text-sm gap-5 font-medium">
                        <Link to={"/"}> <li className="hover:underline cursor-pointer">Home</li></Link>
                        <Link to={"/jobs"}> <li className="hover:underline cursor-pointer">Jobs</li></Link>
                        <Link to={"/browse"}><li className="hover:underline cursor-pointer">Browse</li></Link>
                    </ul>

                    {
                        !user ? (<div className="flex items-center justify-center gap-2">
                            <Link to={"/login"}> <Button variant="outline">Login</Button></Link>
                            <Link to={"/signup"}> <Button var>Signup</Button></Link>
                        </div>) : (
                            <Popover>
                                <PopoverTrigger>
                                    <Avatar className="w-7 h-7 rounded-full">
                                        <AvatarImage src={"/vite.svg"} alt="avatar" />
                                    </Avatar>
                                </PopoverTrigger>

                                <PopoverContent className="w-72">
                                    <div className="flex items-center gap-1">
                                        <Avatar className="w-5 h-5 rounded-full">
                                            <AvatarImage src={"/vite.svg"} alt="avatar" />
                                        </Avatar>
                                        <div>
                                            <h1 className="text-sm font-medium">name</h1>
                                            <p className="text-xs text-slate-500 text-muted-foreground">Lorem ipsum dolor sit amet consectetur.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 justify-between">
                                        <div className="flex items-center gap-1">
                                            <User2 size={18} className="text-slate-600" />
                                            <Button className="mt-2" variant="outline">View Profile</Button>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <LogOut size={18} className="text-slate-600" />
                                            <Button className="mt-2" variant="destructive">Logout</Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }


                </div>
            </div>

        </div>
    )
}

export default Navbar;