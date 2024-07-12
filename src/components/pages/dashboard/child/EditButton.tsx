import React from "react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../../ui/dialog";
import Role from "../../../../enums/Role";
import User from "../../../../types/User";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { UserSchema } from "../../../../types/UserSchema";

type EditButton = {
    user: User;
    editButton: (user: User) => void;
}

type FormInputType = {
    fname: string;
    lname: string;
    phone: string;
    email: string;
    userRole: Role;
}

const EditButton: React.FC<EditButton> = (props) => {
    const { handleSubmit, control, formState: { errors } } = useForm<FormInputType>({
        defaultValues: {
            fname: props.user.firstName as string,
            lname: props.user.lastName as string,
            phone: props.user.phone as string,
            email: props.user.email as string,
            userRole: props.user.role
        },
        resolver: zodResolver(UserSchema)
    });

    const onSubmit: SubmitHandler<FormInputType> = (data) => {
        const user: User = {
            id: props.user.id,
            firstName: data.fname,
            lastName: data.lname,
            phone: data.phone,
            email: data.email,
            role: data.userRole
        }
        props.editButton(user);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="h-[35px] hover:bg-blue-500" variant="outline">Edit
                    <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md !bg-[#1b1c20] border-[2px] border-slate-400 font-sans text-slate-400">
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
                                <label className="text-inherit font-sans" htmlFor="fname">First name</label>
                                <Controller name="fname"
                                    control={control}
                                    // rules={
                                    //     {
                                    //         required: "First name needed",
                                    //         minLength: { value: 2, message: "First name must have at least 1 characters" },
                                    //         maxLength: { value: 20, message: "First name must have at most 20 characters" }
                                    //     }}
                                    render={({ field }) => <Input className="text-white bg-zinc-900 border-slate-400 font-thin" {...field}></Input>}>
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
                                    render={({ field }) => <Input className="text-white bg-zinc-900 border-slate-400 font-thin" {...field}></Input>}>
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
                                    render={({ field }) => <Input className="text-white bg-zinc-900 border-slate-400 font-thin" {...field}></Input>}>
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
                                    render={({ field }) => <Input className="text-white bg-zinc-900 border-slate-400 font-thin" {...field}></Input>}>
                                </Controller>
                                {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                            </div>
                            <div className="select-container mt-2 flex">
                                <label className="text-inherit font-thin mr-5" htmlFor="userRole">Role</label>
                                <Controller name="userRole"
                                    control={control}
                                    render={({ field }) =>
                                        <select className="text-white font-sans bg-zinc-900 border-slate-400 border rounded" {...field} defaultValue={props.user.role}>
                                            {
                                                Object.values(Role).map((role, idx) => (
                                                    <option className="bg-zinc-900 text-white" key={idx} value={role}>{role.slice(0, 1).toUpperCase() + role.slice(1)}</option>
                                                ))
                                            }
                                        </select>}></Controller>
                            </div>
                            {errors.userRole && <span className="text-red-500">{errors.userRole.message}</span>}
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