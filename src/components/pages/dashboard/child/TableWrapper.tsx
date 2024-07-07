import { useEffect, useState } from "react"
import User from "../../../../types/User"
import TableControl from "./TableControl"
import UserTable from "./UserTable"
import Role from "../../../../enums/Role"
import * as XLSX from 'xlsx'
import TablePagination from "./TablePagination"
type TableWrapperProps = {
    users: User[],
    addUser: (user: User) => void;
    deleteUser: (user: User) => void;
    editUser: (user: User) => void;
}

export const ROLE_OPTIONS = ["All", ...Object.values(Role).map((role: Role) => role as string)];
const TableWrapper: React.FC<TableWrapperProps> = (props) => {
    const [page, setPage] = useState<number>(1);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
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
        setDisplayedUsers(props.users.filter((user) => user.role === ROLE_OPTIONS[roleOption] || roleOption === 0));
    }, [roleOption]);

    useEffect(() => {
        setDisplayedUsers(displayedUsers.filter((user) =>
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
        <div>
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
            <div className="flex justify-center mt-5">
                <UserTable
                    editUser={props.editUser}
                    deleteUser={props.deleteUser}
                    users={displayedUsers} />
            </div>
            <TablePagination
                users={props.users}
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
            ></TablePagination>
        </div>
    )
}

export default TableWrapper;