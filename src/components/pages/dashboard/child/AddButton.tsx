import React from "react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../../ui/dialog";
import Role from "../../../../enums/Role";
import User from "../../../../types/User";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { UserSchema } from "../../../../types/UserSchema";

type AddButtonProps = {
    addUser: (user: User) => void;
}

interface IFormInput {
    fname: string;
    lname: string;
    phone: string;
    email: string;
    userRole: Role;
}

const AddButton: React.FC<AddButtonProps> = (props) => {
    const { handleSubmit, control, formState: { errors } } = useForm<IFormInput>({
        resolver: zodResolver(UserSchema),
    });
    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        const user: User = {
            id: -1,
            firstName: data.fname,
            lastName: data.lname,
            phoneNumber: data.phone,
            email: data.email,
            role: data.userRole
        }
        props.addUser(user);
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-orange-400 rounded-none px-5"><span className="text-xl">+</span>&nbsp;&nbsp;Add User</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Add User</DialogTitle>
                    <DialogDescription>
                        Add a proper user to the system.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="input-container">
                                <label className="text-black" htmlFor="fname">First name</label>
                                <Controller name="fname"
                                    control={control}
                                    // rules={
                                    //     {
                                    //         required: "First name needed",
                                    //         minLength: { value: 2, message: "First name must have at least 1 characters" },
                                    //         maxLength: { value: 20, message: "First name must have at most 20 characters" }
                                    //     }}
                                    render={({ field }) => <Input {...field}></Input>}>
                                </Controller>
                                {errors.fname && <span className="text-red-500">{errors.fname.message}</span>}
                            </div>
                            <div className="input-container">
                                <label className="text-black" htmlFor="lname">Last name</label>
                                <Controller name="lname"
                                    control={control}
                                    // rules={{
                                    //     required: "Last name needed",
                                    //     minLength: { value: 2, message: "Last name must have at least 1 characters" },
                                    //     maxLength: { value: 20, message: "Last name must have at most 20 characters" }
                                    // }}
                                    render={({ field }) => <Input {...field}></Input>}>
                                </Controller>
                                {errors.lname && <span className="text-red-500">{errors.lname.message}</span>}
                            </div>
                            <div className="input-container">
                                <label className="text-black" htmlFor="phone">Phone</label>
                                <Controller name="phone"
                                    control={control}
                                    // rules={{
                                    //     required: "Phone number needed",
                                    //     minLength: { value: 10, message: "Phone number must have at least 10 digits" },
                                    //     maxLength: { value: 15, message: "Phone number must have at most 15 digits" }
                                    // }}
                                    render={({ field }) => <Input {...field}></Input>}>
                                </Controller>
                                {errors.phone && <span className="text-red-500">{errors.phone.message}</span>}
                            </div>
                            <div className="input-container">
                                <label className="text-black" htmlFor="email">Email</label>
                                <Controller name="email"
                                    control={control}
                                    // rules={{
                                    //     required: "Phone email needed",
                                    //     pattern: {
                                    //         value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Invalid email"
                                    //     }
                                    // }}
                                    render={({ field }) => <Input {...field}></Input>}>
                                </Controller>
                                {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                            </div>
                            <div className="select-container">
                                <label className="text-black" htmlFor="userRole">Role</label>
                                <Controller name="userRole"
                                    control={control}
                                    render={({ field }) =>
                                        <select {...field}>
                                            {Object.values(Role).map((role, idx) => (
                                                <option className="bg-white" key={idx} value={role}>{role}</option>
                                            ))}
                                        </select>}></Controller>
                                {errors.userRole && <span className="text-red-500">{errors.userRole.message}</span>}
                            </div>
                            <div className="flex justify-between mt-2 space-x-2">
                                <DialogClose asChild>
                                    <Button className="bg-gray-300 border-stone-300 border hover:border-2 hover:border-black hover:bg-blue-600" variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button className="bg-blue-400" type="submit">Save</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </DialogContent >
        </Dialog >
    )
}
export default AddButton;