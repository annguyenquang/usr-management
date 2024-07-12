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
            phone: data.phone,
            email: data.email,
            role: data.userRole
        }
        props.addUser(user);
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-orange-400 hover:bg-orange-300 z-0 px-5"><span className="text-xl">+</span>&nbsp;&nbsp;Add User</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md !bg-[#1b1c20] border-[2px] border-slate-400 font-sans text-slate-400">
                <DialogHeader>
                    <DialogTitle className="text-white text-2xl">Add <span className="text-orange-400">User</span></DialogTitle>
                    <DialogDescription>
                        Add a proper user to the system.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="input-container">
                                <label className="text-inherit font-sans" htmlFor="fname">First name</label>
                                <Controller name="fname"
                                    control={control}
                                    // rules={
                                    //     {
                                    //         required: "First name needed",
                                    //         minLength: { value: 2, message: "First name must have at least 1 characters" },
                                    //         maxLength: { value: 20, message: "First name must have at most 20 characters" }
                                    //     }}
                                    render={({ field }) => <Input className="text-white bg-zin123c-900 border-slate-400 font-thin" {...field} />}>
                                </Controller>
                                {errors.fname && <span className="text-red-500">{errors.fname.message}</span>}
                            </div>
                            <div className="input-container">
                                <label className="text-inherit font-sans" htmlFor="lname">Last name</label>
                                <Controller name="lname"
                                    control={control}
                                    // rules={{
                                    //     required: "Last name needed",
                                    //     minLength: { value: 2, message: "Last name must have at least 1 characters" },
                                    //     maxLength: { value: 20, message: "Last name must have at most 20 characters" }
                                    // }}
                                    render={({ field }) => <Input className="text-white bg-zinc-900 border-slate-400 font-thin" {...field} />}>
                                </Controller>
                                {errors.lname && <span className="text-red-500">{errors.lname.message}</span>}
                            </div>
                            <div className="input-container">
                                <label className="text-inherit font-sans" htmlFor="phone">Phone</label>
                                <Controller name="phone"
                                    control={control}
                                    // rules={{
                                    //     required: "Phone number needed",
                                    //     minLength: { value: 10, message: "Phone number must have at least 10 digits" },
                                    //     maxLength: { value: 15, message: "Phone number must have at most 15 digits" }
                                    // }}
                                    render={({ field }) => <Input className="text-white bg-zinc-900 border-slate-400 font-thin" {...field} />}>
                                </Controller>
                                {errors.phone && <span className="text-red-500">{errors.phone.message}</span>}
                            </div>
                            <div className="input-container">
                                <label className="text-inherit font-sans" htmlFor="email">Email</label>
                                <Controller name="email"
                                    control={control}
                                    // rules={{
                                    //     required: "Phone email needed",
                                    //     pattern: {
                                    //         value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Invalid email"
                                    //     }
                                    // }}
                                    render={({ field }) => <Input className="text-white bg-zinc-900 border-slate-400 font-thin" {...field} />}>
                                </Controller>
                                {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                            </div>
                            <div className="select-container mt-2">
                                <label className="text-inherit font-thin mr-5" htmlFor="userRole">Role</label>
                                <Controller name="userRole"
                                    control={control}
                                    render={({ field }) =>
                                        <select className="text-white font-sans bg-zinc-900 border-slate-400 border rounded" {...field} >
                                            {
                                                Object.values(Role).map((role, idx) => (
                                                    <option className="text-white bg-zinc-900" key={idx} value={role}>{role.slice(0, 1).toUpperCase() + role.slice(1)}</option>
                                                ))
                                            }
                                        </select>}></Controller>
                            </div>
                            <div className="flex justify-between mt-4 space-x-2">
                                <DialogClose asChild>
                                    <Button className="bg-gray-300 border-stone-300 border hover:border-2 hover:border-black hover:bg-blue-600 origin-center hover:scale-125 text-black" variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button className="bg-orange-400 px-9 font-thin transition delay-100 hover:scale-125 hover:bg-orange-300" type="submit">Save</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </DialogContent >
        </Dialog >
    )
}
export default AddButton;