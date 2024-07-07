import { useEffect, useState } from "react"
import User from "../../../../types/User"
import TableControl from "./TableControl"
import UserTable from "./UserTable"
import Role from "../../../../enums/Role"
import * as XLSX from 'xlsx'
import TablePagination from "./TablePagination"
import { SORT_OPTIONS } from "../Dashboard"
type TableWrapperProps = {
    users: User[],
    addUser: (user: User) => void;
    deleteUser: (user: User) => void;
    editUser: (user: User) => void;
    sortById: (op: SORT_OPTIONS) => void;
}
// enum sort encreases, decreases
export const ROLE_OPTIONS = ["All", ...Object.values(Role).map((role: Role) => role as string)];

const TableWrapper: React.FC<TableWrapperProps> = (props) => {
    const [page, setPage] = useState<number>(1);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [displayedUsers, setDisplayedUsers] = useState<User[]>([]);
    const [roleOption, setRoleOption] = useState<number>(0);
    const [searchText, setSearchText] = useState<string>("");

    const exportToXLSX = (): void => {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(props.users);
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
            user.phoneNumber.toLowerCase().includes(searchText.toLowerCase()
            )));
    }, [searchText]);

    useEffect(() => {
        const startIndex = page * rowsPerPage - rowsPerPage;
        const endIndex = (startIndex + rowsPerPage) > props.users.length - 1 ?
            props.users.length : startIndex + rowsPerPage;
        setDisplayedUsers(props.users.slice(startIndex, endIndex));
    }, [page, props.users, rowsPerPage]);

    return (
        <div className="h-full flex flex-col justify-between p-5">
            <div className=" overflow-auto">
                <TableControl
                    addUser={props.addUser}
                    exportToXLSX={exportToXLSX}
                    page={page}
                    setPage={setPage}
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={setRowsPerPage}
                    setSearchText={setSearchText}
                    roleOption={roleOption}
                    setRoleOption={setRoleOption} />
                <div className="mt-5">
                    <UserTable
                        editUser={props.editUser}
                        deleteUser={props.deleteUser}
                        users={displayedUsers}
                        sortById={props.sortById} />
                </div>
            </div>
            <div className="flxe-1">
                <TablePagination
                    users={props.users}
                    page={page}
                    setPage={setPage}
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={setRowsPerPage}
                ></TablePagination>
            </div>
        </div>
    )
}

export default TableWrapper;