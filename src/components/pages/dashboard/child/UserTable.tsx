import { useContext, useState } from "react";
import { UserContext } from "../Dashboard";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import User from "../../../../types/User";
import React from "react";
import Role from "../../../../enums/Role";
import { Avatar, Badge, Card, Code, DataList, Flex, IconButton, Link, Tooltip } from "@radix-ui/themes";
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
        <>
            {/* PC */}
            <div className="bg-[#515151] rounded-xl ohidden md:blockverflow-hidden hidden md:block">
                <table id="usr-table" className="w-full table-auto border-spacing-11">
                    <thead>
                        <tr className="w-full bg-slate-800 h-[45px]">
                            <th className="w-5 font-thin text-center">ID
                                <svg onClick={onSortById} className={`${sortBy == "id" ? "border" : ""} inline ml-1 hover:bg-slate-400 hover: cursor-pointer rounded`} width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                            </th>
                            <th className="w-16 text-[14px] font-thin text-start ">
                                First Name
                                <svg onClick={onSortByFirstName} className={`${sortBy == "firstName" ? "border" : ""} inline ml-1 hover:bg-slate-400 hover: cursor-pointer rounded`} width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                            </th>
                            <th className="w-12 text-[14px] font-thin text-start">
                                Last Name
                                <svg onClick={onSortByLastName} className={`${sortBy == "lastName" ? "border" : ""} inline ml-1 hover:bg-slate-400 hover: cursor-pointer rounded`} width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                            </th>
                            <th className="w-24 text-[14px] font-thin text-start">
                                Phone
                                <svg onClick={onSortByPhone} className={`${sortBy == "phone" ? "border" : ""} inline ml-1 hover:bg-slate-400 hover: cursor-pointer rounded`} width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                            </th>
                            <th className="w-24 text-[14px] font-thin mr-2 text-start">
                                Email
                                <svg onClick={onSortByEmail} className={`${sortBy == "email" ? "border" : ""} inline ml-1 hover:bg-slate-400 hover: cursor-pointer rounded`} width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                            </th>
                            <th className="w-24 text-[14px] font-thin text-start">
                                Role
                                <svg onClick={onSortByRole} className={`${sortBy == "role" ? "border" : ""} inline ml-1 hover:bg-slate-400 hover: cursor-pointer rounded`} width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                            </th>
                            <th className="w-10 font-thin">Edit</th>
                            <th className="w-10 font-thin">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.users.map((user, idx) => (
                            <Tooltip key={idx} side="bottom" className="bg-white" align="center" delayDuration={500} content={<Avatar className="rounded border border-black" size="9" src={user.image} fallback="No image"></Avatar>}>
                                <tr className="m-4 text-start overflow-hidden hover:border hover:border-black hover:bg-slate-300 hover:skew-x-3 hover:text-black hover:cursor-pointer">
                                    <td className="font-semibold text-center text-inherit">{user.id}</td>
                                    <td className="font-semibold text-inherit">{user.firstName}</td>
                                    <td className="font-semibold text-inherit">{user.lastName}</td>
                                    <td className="font-semibold text-inherit whitespace-nowrap">{user.phone}</td>
                                    <td className="font-semibold text-start">{user.email}</td>
                                    <td className="font-semibold text-inherit">
                                        {/* <span className={`px-2 ${user.role === Role.USER && "bg-slate-800"} ${user.role === Role.EDITOR && "bg-sky-800"} ${user.role === Role.ADMIN && "bg-red-500"}`}>
                                    {user.role}
                                </span> */}
                                        {/* {user.role === Role.EDITOR && <Badge color="blue" radius="full">Editor</Badge>} */}
                                        {user.role === Role.USER && <Badge className="border-inherit" color="gray" radius="small">User</Badge>}
                                        {user.role === Role.ADMIN && <Badge color="yellow" radius="small">Admin</Badge>}
                                        {user.role === Role.MODERATOR && <Badge color="blue" radius="small">Moderator</Badge>}
                                    </td>
                                    <td className="font-semibold text-center"><EditButton user={user} /></td>
                                    <td className="font-semibold text-center"><DeleteButton deleteUser={props.deleteUser} user={user} /></td>
                                </tr>

                            </Tooltip>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* MOBILE */}
            <div className="md:hidden ">
                {props.users.map(u =>
                    <Card className="flex bg-[#111113] !p-5 overflow-hidden space-x-3 border border-slate-300 mt-1">
                        <div className="w-1/3 flex flex-col justify-center items-center">
                            <Avatar className="bg-slate-100 w-full h-full" src={u.image} fallback="No image" variant="soft" ></Avatar>
                            <p>{u.lastName}</p>
                        </div>
                        <DataList.Root className="w-full">
                            <DataList.Item align="center">
                                <DataList.Label minWidth="22px">Role</DataList.Label>
                                <DataList.Value>
                                    {u.role === Role.ADMIN && <Badge color="yellow" radius="small">Admin</Badge>}
                                    {u.role === Role.USER && <Badge className="border-inherit" color="gray" radius="small">User</Badge>}
                                    {u.role === Role.MODERATOR && <Badge color="blue" radius="small">Moderator</Badge>}
                                </DataList.Value>
                            </DataList.Item>
                            <DataList.Item>
                                <DataList.Label minWidth="22px">ID</DataList.Label>
                                <DataList.Value>
                                    <Flex align="center" gap="2">
                                        <Code variant="ghost">#{u.id}</Code>
                                        <IconButton
                                            size="1"
                                            aria-label="Copy value"
                                            color="gray"
                                            variant="ghost"
                                        >
                                            {/* <CopyIcon /> */}
                                        </IconButton>
                                    </Flex>
                                </DataList.Value>
                            </DataList.Item>
                            <DataList.Item>
                                <DataList.Label minWidth="22px">Name</DataList.Label>
                                <DataList.Value>{u.lastName} {u.firstName}</DataList.Value>
                            </DataList.Item>
                            <DataList.Item>
                                <DataList.Label minWidth="22px">Email</DataList.Label>
                                <DataList.Value>
                                    <Link href={`mailto:${u.email}`}>{u.email}</Link>
                                </DataList.Value>
                            </DataList.Item>
                            <DataList.Item>
                                <DataList.Label minWidth="22px">Phone</DataList.Label>
                                <DataList.Value>
                                    <Link href="#">{u.phone}</Link>
                                </DataList.Value>
                            </DataList.Item>
                        </DataList.Root>
                    </Card>
                )}
            </div>
        </>
    );
};

export default UserTable;