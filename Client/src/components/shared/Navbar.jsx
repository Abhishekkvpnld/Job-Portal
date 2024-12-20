import { LogOut, User2 } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";



const Navbar = () => {
    return (
        <div className="bg-white">

            <div className="flex items-center justify-between px-10 py-1">
                <div>
                    <h1 className="text-2xl font-bold text-slate-500">Find<span className="text-red-800">Job</span></h1>
                </div>

                <div className="flex items-center gap-11">
                    <ul className="flex items-center text-sm gap-5 font-medium">
                        <li>Home</li>
                        <li>Jobs</li>
                        <li>Browse</li>
                    </ul>

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
                                    <User2 size={18}  className="text-slate-600"/>
                                    <Button className="mt-2" variant="outline">View Profile</Button>
                                </div>
                                <div className="flex items-center gap-2">
                                    <LogOut size={18}  className="text-slate-600"/>
                                    <Button className="mt-2" variant="destructive">Logout</Button>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

        </div>
    )
}

export default Navbar;