import { useEffect, useState } from "react"
import User from "../../../../types/User"
import TableControl from "./TableControl"
import UserTable from "./UserTable"
import Role from "../../../../enums/Role"

type TableWrapperProps = {
    users: User[]
}

export const ROLE_OPTIONS = ["All", ...Object.values(Role).map((role: Role) => role as string)];
const TableWrapper: React.FC<TableWrapperProps> = (props) => {
    const [page, setPage] = useState<number>(1);
    const [rowsPerPage, setRowsPerPage] = useState<number>(19);
    const [displayedUsers, setDisplayedUsers] = useState<User[]>([]);
    const [roleOption, setRoleOption] = useState<number>(0);
    const [searchText, setSearchText] = useState<string>("");

    useEffect(() => {
        console.log("displayedUsers");
        setDisplayedUsers(props.users);
    }, [props.users]);

    useEffect(() => {
        console.log("role");
        setDisplayedUsers(props.users.filter((user) => user.role === ROLE_OPTIONS[roleOption] || roleOption === 0));
    }, [roleOption]);

    useEffect(() => {
        console.log("text search");
        setDisplayedUsers(displayedUsers.filter((user) =>
            user.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
            user.lastName.toLowerCase().includes(searchText.toLowerCase()) ||
            user.email.toLowerCase().includes(searchText.toLowerCase()) ||
            user.role.toLowerCase().includes(searchText.toLowerCase()) ||
            user.phoneNumber.toLowerCase().includes(searchText.toLowerCase()
            )));
    }, [searchText]);

    useEffect(() => {
        console.log("page");
        const startIndex = page * rowsPerPage - rowsPerPage;
        const endIndex = (startIndex + rowsPerPage) > props.users.length - 1 ?
            props.users.length : startIndex + rowsPerPage;
        console.log(startIndex, endIndex);
        console.log(props.users);
        setDisplayedUsers(props.users.slice(startIndex, endIndex));
    }, [page, props.users, rowsPerPage]);

    return (
        <div>
            <TableControl rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} setSearchText={setSearchText} roleOption={roleOption} setRoleOption={setRoleOption} />
            <UserTable users={displayedUsers} />
        </div>
    )
}

export default TableWrapper;