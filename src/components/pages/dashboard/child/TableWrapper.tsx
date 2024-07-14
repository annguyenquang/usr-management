import { useContext, useEffect, useState } from "react"
import User from "../../../../types/User"
import TableControl from "./TableControl"
import UserTable from "./UserTable"
import Role from "../../../../enums/Role"
import * as XLSX from 'xlsx'
import TablePagination from "./TablePagination"
import { UserContext } from "../Dashboard"
import React from "react"
import axios from "axios"
import { getTailwindBreakPointValue } from "../../../../utils/helper"
type TableWrapperProps = {
    users: User[],
    addUser: (user: User) => void;
    deleteUser: (user: User) => void;
    editUser: (user: User) => void;
}
// enum sort encreases, decreases
export const ROLE_OPTIONS = ["All", ...Object.values(Role).map((role: Role) => role as string)];

const TableWrapper: React.FC<TableWrapperProps> = (props) => {
    const { totalUsers } = useContext(UserContext);
    const [displayedUsers, setDisplayedUsers] = useState<User[]>([]);
    const [roleOption, setRoleOption] = useState<number>(0);
    const [searchText, setSearchText] = useState<string>("");

    const exportToXLSX = async () => {
        let users: User[] = [];
        try {
            const res = await axios.get(`https://dummyjson.com/users?limit=${totalUsers}`);
            users = res.data.users;
        } catch (error) {
            console.log(error);
            return;
        }
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(users);
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, "my_excel_file.xlsx");
    }

    useEffect(() => {
        setDisplayedUsers(props.users);
    }, [props.users]);

    useEffect(() => {
        if (roleOption === 0) {
            setDisplayedUsers(props.users);
        }
        else {
            setDisplayedUsers(props.users.filter((user) => user.role === ROLE_OPTIONS[roleOption]));
        }
    }, [roleOption]);

    useEffect(() => {
        setDisplayedUsers(props.users.filter((user) =>
            user.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
            user.lastName.toLowerCase().includes(searchText.toLowerCase()) ||
            user.email.toLowerCase().includes(searchText.toLowerCase()) ||
            user.role.toLowerCase().includes(searchText.toLowerCase()) ||
            user.phone.toLowerCase().includes(searchText.toLowerCase()
            )));
    }, [searchText]);

    return (
        <div className="h-full flex flex-col justify-between md:p-5">
            <div className="flex-1">
                <div className="sticky px-1 top-0 z-10">
                    <TableControl addUser={props.addUser} exportToXLSX={exportToXLSX} setSearchText={setSearchText} roleOption={roleOption} setRoleOption={setRoleOption} />
                </div>
                <div className="overflow-hidden px-1">
                    <UserTable editUser={props.editUser} deleteUser={props.deleteUser} users={displayedUsers} />
                </div>
            </div>
            <div className="sticky px-2 bottom-0 z-10 bg-[#515151]">
                <TablePagination number_of_pages={window.innerWidth > getTailwindBreakPointValue("md") ? 5 : 4} />
            </div>
        </div>
    )
}

export default TableWrapper;