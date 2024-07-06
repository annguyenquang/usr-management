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
    const [displayedUsers, setDisplayedUsers] = useState<User[]>([]);
    const [roleOption, setRoleOption] = useState<number>(0);
    const [searchText, setSearchText] = useState<string>("");
    useEffect(() => {
        setDisplayedUsers(props.users.filter((user) => user.role === ROLE_OPTIONS[roleOption] || roleOption === 0));
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
        console.log("TableWrapper: useEffect");
        console.log(props.users);
        setDisplayedUsers(props.users);
    }, [props.users]);

    return (
        <div>
            <TableControl setSearchText={setSearchText} roleOption={roleOption} setRoleOption={setRoleOption} />
            <UserTable users={displayedUsers} />
        </div>
    )
}

export default TableWrapper;