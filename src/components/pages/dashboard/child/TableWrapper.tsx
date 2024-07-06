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
    useEffect(() => {
        setDisplayedUsers(props.users.filter((user) => user.role === ROLE_OPTIONS[roleOption] || roleOption === 0));
    }, [roleOption]);
    useEffect(() => {
        console.log("TableWrapper: useEffect");
        console.log(props.users);
        setDisplayedUsers(props.users);
    }, [props.users]);

    return (
        <div>
            <TableControl roleOption={roleOption} setRoleOption={setRoleOption} />
            <UserTable users={displayedUsers} />
        </div>
    )
}

export default TableWrapper;