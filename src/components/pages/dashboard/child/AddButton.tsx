import { SubmitHandler, useForm, Controller } from "react-hook-form";
import Role from "../../../../enums/Role";
import User from "../../../../types/User";
import { Button } from "../../../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../../ui/dialog";
import { Input } from "../../../ui/input";
import React from "react";

type AddButtonProps = {
    addUser: (user: User) => void;
}

interface IFormInput {
    fname: string;
    lname: string;
    phone: string;
    email: string;
    userRole: number;
}

const AddButton: React.FC<AddButtonProps> = (props) => {
    const { handleSubmit, control, formState: { errors } } = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        const user: User = {
            id: -1,
            firstName: data.fname,
            lastName: data.lname,
            phoneNumber: data.phone,
            email: data.email,
            role: Object.values(Role)[data.userRole]
        }
        props.addUser(user);
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Add</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Share link</DialogTitle>
                    <DialogDescription>
                        Anyone who has this link will be able to view this.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="input-container">
                                <label htmlFor="fname">First name</label>
                                <Controller name="fname"
                                    control={control}
                                    rules={{ required: "First name needed" }}
                                    render={({ field }) => <Input {...field}></Input>}>
                                </Controller>
                                {errors.fname && <span className="text-red-500">{errors.fname.message}</span>}
                            </div>
                            <div className="input-container">
                                <label htmlFor="lname">Last name</label>
                                <Controller name="lname"
                                    control={control}
                                    rules={{ required: "Last name needed" }}
                                    render={({ field }) => <Input {...field}></Input>}>
                                </Controller>
                                {errors.lname && <span className="text-red-500">{errors.lname.message}</span>}
                            </div>
                            <div className="input-container">
                                <label htmlFor="phone">Phone</label>
                                <Controller name="phone"
                                    control={control}
                                    render={({ field }) => <Input {...field}></Input>}>
                                </Controller>
                            </div>
                            <div className="input-container">
                                <label htmlFor="email">Email</label>
                                <Controller name="email"
                                    control={control}
                                    render={({ field }) => <Input {...field}></Input>}>
                                </Controller>
                            </div>
                            <div className="select-container">
                                <label htmlFor="userRole">Role</label>
                                <Controller name="userRole"
                                    control={control}
                                    render={({ field }) =>
                                        <select {...field}>
                                            {Object.keys(Role).map((role, idx) => (
                                                <option className="bg-white" key={idx} value={idx}>{role}</option>
                                            ))}
                                        </select>}></Controller>
                            </div>
                            <div className="flex justify-end">
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="submit">Save</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </DialogContent >
        </Dialog >
    )
}
export default AddButton;