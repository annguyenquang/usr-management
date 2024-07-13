import React, { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../../ui/dialog";
import Role from "../../../../enums/Role";
import User from "../../../../types/User";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { UserSchema } from "../../../../types/UserSchema";
import { VerticalSeparator } from "./AddButton";
import { Avatar } from "@radix-ui/themes";
import { UserContext } from "../Dashboard";

type EditButtonProps = {
    user: User;
}

interface IFormInput {
    fname: string;
    lname: string;
    phone: string;
    email: string;
    userRole: Role;
    image?: string;
}

const EditButton: React.FC<EditButtonProps> = (props) => {
    const { editUser } = useContext(UserContext);
    const [image, setImage] = useState(props.user.image || '');
    const { handleSubmit, control, formState: { errors } } = useForm<IFormInput>({
        defaultValues: {
            fname: props.user.firstName as string,
            lname: props.user.lastName as string,
            phone: props.user.phone as string,
            email: props.user.email as string,
            userRole: props.user.role,
            image: props.user.image as string
        },
        resolver: zodResolver(UserSchema)
    });


    const onSubmit: SubmitHandler<IFormInput> = (data) => {

        editUser({
            id: props.user.id,
            firstName: data.fname,
            lastName: data.lname,
            phone: data.phone,
            email: "emaillll",
            role: data.userRole,
            "image": image
        });
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="h-[35px] hover:bg-blue-500" variant="outline">Edit
                    <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl !bg-[#1b1c20] border-[2px] border-slate-400 font-sans text-slate-400">
                <DialogHeader>
                    <DialogTitle className="text-white text-xl md:text-3xl lg:text-4xl">Update <span className="text-orange-400">User</span></DialogTitle>
                    <DialogDescription>
                        Change only should be made when nessasary.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div id="add-form-body" className="flex space-x-3">
                                <div id="right-side-edit-form" className="flex-1">
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
                                                </select>}>
                                        </Controller>
                                    </div>
                                </div>
                                <VerticalSeparator />
                                <div id="left-side-edit-form" className="flex-1">
                                    <RightSideForm control={control} id={props.user.id} image={image} setImage={setImage} />
                                </div>
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
export default EditButton;



export const RightSideForm: React.FC<{ control, image, setImage, id }> = (props) => {
    const onChangeImage = (e) => {
        const file = e.target.files[0];
        console.log("File", file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                props.setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }
    const removeImage = () => {
        props.setImage(null);
    }
    return (
        <div>
            <Controller
                control={props.control}
                name="image"
                render={({ field }) =>
                    <label {...field} htmlFor={`avt-inp-usr${props.id}`}>
                        <div className="flex flex-col items-center space-y-5">
                            <Avatar className="rounded-2xl bg-slate-500" src={props.image}
                                fallback=
                                {
                                    <svg className="w-3/4" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.877014 7.49988C0.877014 3.84219 3.84216 0.877045 7.49985 0.877045C11.1575 0.877045 14.1227 3.84219 14.1227 7.49988C14.1227 11.1575 11.1575 14.1227 7.49985 14.1227C3.84216 14.1227 0.877014 11.1575 0.877014 7.49988ZM7.49985 1.82704C4.36683 1.82704 1.82701 4.36686 1.82701 7.49988C1.82701 8.97196 2.38774 10.3131 3.30727 11.3213C4.19074 9.94119 5.73818 9.02499 7.50023 9.02499C9.26206 9.02499 10.8093 9.94097 11.6929 11.3208C12.6121 10.3127 13.1727 8.97172 13.1727 7.49988C13.1727 4.36686 10.6328 1.82704 7.49985 1.82704ZM10.9818 11.9787C10.2839 10.7795 8.9857 9.97499 7.50023 9.97499C6.01458 9.97499 4.71624 10.7797 4.01845 11.9791C4.97952 12.7272 6.18765 13.1727 7.49985 13.1727C8.81227 13.1727 10.0206 12.727 10.9818 11.9787ZM5.14999 6.50487C5.14999 5.207 6.20212 4.15487 7.49999 4.15487C8.79786 4.15487 9.84999 5.207 9.84999 6.50487C9.84999 7.80274 8.79786 8.85487 7.49999 8.85487C6.20212 8.85487 5.14999 7.80274 5.14999 6.50487ZM7.49999 5.10487C6.72679 5.10487 6.09999 5.73167 6.09999 6.50487C6.09999 7.27807 6.72679 7.90487 7.49999 7.90487C8.27319 7.90487 8.89999 7.27807 8.89999 6.50487C8.89999 5.73167 8.27319 5.10487 7.49999 5.10487Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                                }
                            ></Avatar>
                            <div className="flex-1">
                                <span className="border rounded bg-slate-800 p-2 hover:cursor-pointer hover:bg-slate-500">
                                    Select image
                                </span>
                            </div>
                        </div>
                        <input onChange={onChangeImage} id={`avt-inp-usr${props.id}`} className="hidden" type="file" accept="image/*" />
                    </label >
                }
            >

            </Controller>
        </div >

    )
}
