import { Label } from "../ui/label"
import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogFooter } from "../ui/dialog"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { USER_API_END_POINT } from "@/utils/constants"
import { setAuthUser } from "@/redux/authSlice"
import { toast } from "sonner"



const UpdateProfileBox = ({ open, setOpen }) => {

    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phone: user?.phone || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.map(skill => skill) || "",
        file: null
    });

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const fileHandler = (e) => {
        let file = e.target.files?.[0]
        setInput({ ...input, file })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname)
        formData.append("email", input.email)
        formData.append("phone", input.phone)
        formData.append("bio", input.bio)
        formData.append("skills", input.skills)
        if (input.file) {
            formData.append("file", input.file)
        }

        try {
            setLoading(true)
            const res = await axios.put(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            });

            if (res.data.success) {
                dispatch(setAuthUser(res.data.data));
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        } finally {
            setLoading(false);
        }
        setOpen(false)
        console.log(input)
    }

    return (
        <Dialog open={open}>
            <DialogContent className="max-w-[70%]" onInteractOutside={() => setOpen(false)}>
                <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                </DialogHeader>

                <form onSubmit={submitHandler}>
                    <div className="grid gap-4 py-3">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right" htmlFor="name">Name</Label>
                            <Input onChange={changeEventHandler} type="text" value={input.fullname} name="name" id="name" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right" htmlFor="email">Email</Label>
                            <Input onChange={changeEventHandler} value={input.email} type={"email"} name="email" id="email" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right" htmlFor="phone">Phone</Label>
                            <Input onChange={changeEventHandler} type="number" value={input.phone} name="phone" id="phone" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right" htmlFor="bio">Bio</Label>
                            <Input onChange={changeEventHandler} name="bio" value={input.bio} id="bio" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right" htmlFor="skills">skills</Label>
                            <Input onChange={changeEventHandler} name="skills" value={input.skills} id="skills" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right" htmlFor="files">Resume</Label>
                            <Input onChange={fileHandler} name="file" type="file" accept="application/pdf" id="files" className="col-span-3" />
                        </div>
                    </div>
                    <DialogFooter>

                        {
                            loading ? <Button className="w-full my-4 "><Loader2 className="animate-spin" /> Please wait...</Button> :
                                <Button type="submit" className="w-full my-4">Update</Button>
                        }
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateProfileBox