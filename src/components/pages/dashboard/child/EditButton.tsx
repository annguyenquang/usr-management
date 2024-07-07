
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import Role from "../../../../enums/Role";
import User from "../../../../types/User";
import { Button } from "../../../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../../ui/dialog";
import { Input } from "../../../ui/input";
import React from "react";

type EditButton = {
    user: User;
    editButton: (user: User) => void;
}

interface IFormInput {
    fname: string;
    lname: string;
    phone: string;
    email: string;
    userRole: number;
}

const EditButton: React.FC<EditButton> = (props) => {
    const { handleSubmit, control, formState: { errors } } = useForm<IFormInput>({
        defaultValues: {
            fname: props.user.firstName as string,
            lname: props.user.lastName as string,
            phone: props.user.phoneNumber as string,
            email: props.user.email as string,
            userRole: Object.values(Role).indexOf(props.user.role)
        }
    });

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        const user: User = {
            id: props.user.id,
            firstName: data.fname,
            lastName: data.lname,
            phoneNumber: data.phone,
            email: data.email,
            role: Object.values(Role)[data.userRole]
        }
        props.editButton(user);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Edit</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Edit User</DialogTitle>
                    <DialogDescription>
                        Change only should be made when nessasary.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="input-container">
                                <label className="text-black" htmlFor="fname">First name</label>
                                <Controller name="fname"
                                    control={control}
                                    rules={{ required: "First name needed" }}
                                    render={({ field }) => <Input {...field}></Input>}>
                                </Controller>
                                {errors.fname && <span className="text-red-500">{errors.fname.message}</span>}
                            </div>
                            <div className="input-container">
                                <label className="text-black" htmlFor="lname">Last name</label>
                                <Controller name="lname"
                                    control={control}
                                    rules={{ required: "Last name needed" }}
                                    render={({ field }) => <Input  {...field}></Input>}>
                                </Controller>
                                {errors.lname && <span className="text-red-500">{errors.lname.message}</span>}
                            </div>
                            <div className="input-container">
                                <label className="text-black" htmlFor="phone">Phone</label>
                                <Controller name="phone"
                                    control={control}
                                    render={({ field }) => <Input  {...field}></Input>}>
                                </Controller>
                            </div>
                            <div className="input-container">
                                <label className="text-black" htmlFor="email">Email</label>
                                <Controller name="email"
                                    control={control}
                                    render={({ field }) => <Input {...field}></Input>}>
                                </Controller>
                            </div>
                            <div className="select-container mt-2 flex">
                                <label className="mr-2" htmlFor="userRole">Role</label>
                                <Controller name="userRole"
                                    control={control}
                                    render={({ field }) =>
                                        <select {...field} className="border rounded border-stone-400 p-1">
                                            {Object.keys(Role).map((role, idx) => (
                                                <option className="bg-white" key={idx} value={idx}>{role}</option>
                                            ))}
                                        </select>}></Controller>
                            </div>
                            <div className="flex justify-end space-x-3">
                                <DialogClose asChild>
                                    <Button className="bg-gray-300 border-stone-300 border hover:border-2 hover:border-black hover:bg-blue-600" value="outline">Cancel</Button>
                                </DialogClose>
                                <Button className="bg-orange-400" type="submit">Save</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </DialogContent >
        </Dialog >
    )
}
export default EditButton;