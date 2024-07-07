import User from "../../../../types/User";
import { Button } from "../../../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../../ui/dialog";

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
                <Button variant="outline">Delete</Button>
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
                        <p>{props.user.phoneNumber}</p>
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