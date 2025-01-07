import { Label } from "../ui/label"
import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogFooter } from "../ui/dialog"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Loader2 } from "lucide-react"
import { useState } from "react"



const UpdateProfileBox = ({ open, setOpen }) => {

    const [loading, setLoading] = useState(false);

    return (
        <Dialog open={open}>
            <DialogContent className="max-w-[70%]" onInteractOutside={() => setOpen(false)}>
                <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                </DialogHeader>

                <form>
                    <div className="grid gap-4 py-3">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right" htmlFor="name">Name</Label>
                            <Input name="name" id="name" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right" htmlFor="email">Email</Label>
                            <Input name="email" id="email" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right" htmlFor="phone">Phone</Label>
                            <Input name="phone" id="phone" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right" htmlFor="bio">Bio</Label>
                            <Input name="bio" id="bio" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right" htmlFor="skills">skills</Label>
                            <Input name="skills" id="skills" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right" htmlFor="files">Resume</Label>
                            <Input name="files" type="file" accept="application/pdf" id="files" className="col-span-3" />
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