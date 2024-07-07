
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
                <Button className="h-[35px] hover:bg-blue-500" variant="outline">Edit
                    <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                </Button>
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
                                <label className="mr-2 text-black" htmlFor="userRole">Role</label>
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