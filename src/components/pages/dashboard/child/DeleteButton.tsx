import React from "react";
import User from "../../../../types/User";
import { Button } from "../../../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../../ui/dialog";

type DeleteButtonProps = {
    user: User;
    deleteUser: (user: User) => void;
}


const DeleteButton: React.FC<DeleteButtonProps> = (props) => {
    const onDelete = () => {
        props.deleteUser(props.user);
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="h-[35px] hover:bg-red-500" variant="outline">Delete
                    <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Delete Confirm</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this user?
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    {/*User information showed clear, and beautyful*/}
                    <div>
                        <p>{props.user.firstName} {props.user.lastName}</p>
                        <p>{props.user.email}</p>
                        <p>{props.user.phone}</p>
                        <select disabled className="border-2 px-1 border-stone-600 rounded">
                            <option>{props.user.role}</option></select>
                    </div>
                </div>

                <div className="flex flex-row">
                    <DialogClose asChild>
                        <Button className="border-stone-300 border hover:border-2 hover:border-black hover:bg-blue-600" value="outline">Cancel</Button>
                    </DialogClose>
                    <div className="flex-1"></div>
                    <DialogClose asChild>
                        <Button onClick={onDelete} className="bg-red-600 hover:bg-white border-2 hover:border-black">Delete</Button>
                    </DialogClose>
                </div>
            </DialogContent >
        </Dialog >
    )
}
export default DeleteButton;