import { useContext, useState } from "react";
import { ORDER, UserContext } from "../Dashboard";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import User from "../../../../types/User";
import React from "react";
import Role from "../../../../enums/Role";
import { Badge } from "@radix-ui/themes";
import { set } from "react-hook-form";
type TableProps = {
    users: User[]
    deleteUser: (user: User) => void;
    editUser: (user: User) => void;
}

const UserTable: React.FC<TableProps> = (props) => {
    const { sortUsers } = useContext(UserContext);
    const [sortBy, setSortBy] = useState<string>("");

    const onSortById = () => {
        sortUsers("id");
        setSortBy("id");
    }
    const onSortByFirstName = () => {
        sortUsers("firstName");
        setSortBy("firstName");
    }
    const onSortByLastName = () => {
        sortUsers("lastName");
        setSortBy("lastName");
    }
    const onSortByPhone = () => {
        sortUsers("phone");
        setSortBy("phone");
    }
    const onSortByEmail = () => {
        sortUsers("email");
        setSortBy("email");
    }
    const onSortByRole = () => {
        sortUsers("role");
        setSortBy("role");
    }

    return (
        <div className="bg-[#515151]">
            <table id="usr-table" className="w-full table-auto border-spacing-11">
                <thead>
                    <tr className="bg-slate-800 h-[45px]">
                        <th className="w-[50px] font-thin text-center">ID
                            <svg onClick={onSortById} className={`${sortBy == "id" ? "border" : ""} inline ml-1 hover:bg-slate-400 hover: cursor-pointer rounded`} width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                        </th>
                        <th className="w-[100px] text-[14px] font-thin text-start ">
                            First Name
                            <svg onClick={onSortByFirstName} className={`${sortBy == "firstName" ? "border" : ""} inline ml-1 hover:bg-slate-400 hover: cursor-pointer rounded`} width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                        </th>
                        <th className="w-[100px] text-[14px] font-thin text-start">
                            Last Name
                            <svg onClick={onSortByLastName} className={`${sortBy == "lastName" ? "border" : ""} inline ml-1 hover:bg-slate-400 hover: cursor-pointer rounded`} width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                        </th>
                        <th className="w-[150px] text-[14px] font-thin text-start">
                            Phone
                            <svg onClick={onSortByPhone} className={`${sortBy == "phone" ? "border" : ""} inline ml-1 hover:bg-slate-400 hover: cursor-pointer rounded`} width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                        </th>
                        <th className="w-[230px] text-[14px] font-thin mr-2 text-start">
                            Email
                            <svg onClick={onSortByEmail} className={`${sortBy == "email" ? "border" : ""} inline ml-1 hover:bg-slate-400 hover: cursor-pointer rounded`} width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                        </th>
                        <th className="w-[100px] text-[14px] font-thin text-start">
                            Role
                            <svg onClick={onSortByRole} className={`${sortBy == "role" ? "border" : ""} inline ml-1 hover:bg-slate-400 hover: cursor-pointer rounded`} width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                        </th>
                        <th className="w-[50px] font-thin"></th>
                        <th className="w-[50px] font-thin"></th>
                    </tr>
                </thead>
                <tbody>
                    {props.users.map((user, idx) => (
                        <tr key={idx} className="m-4">
                            <td className="font-semibold text-center">{user.id}</td>
                            <td className="font-semibold">{user.firstName}</td>
                            <td className="font-semibold">{user.lastName}</td>
                            <td className="font-semibold">{user.phone}</td>
                            <td className="font-semibold">{user.email}</td>
                            <td className="font-semibold">
                                {/* <span className={`px-2 ${user.role === Role.USER && "bg-slate-800"} ${user.role === Role.EDITOR && "bg-sky-800"} ${user.role === Role.ADMIN && "bg-red-500"}`}>
                                    {user.role}
                                </span> */}
                                {/* {user.role === Role.EDITOR && <Badge color="blue" radius="full">Editor</Badge>} */}
                                {user.role === Role.USER && <Badge color="gray" radius="full">User</Badge>}
                                {user.role === Role.ADMIN && <Badge color="yellow" radius="full">Admin</Badge>}
                                {user.role === Role.MODERATOR && <Badge color="blue" radius="full">Moderator</Badge>}
                            </td>
                            <td className="font-semibold"><EditButton user={user} editButton={props.editUser} /></td>
                            <td className="font-semibold"><DeleteButton deleteUser={props.deleteUser} user={user} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;