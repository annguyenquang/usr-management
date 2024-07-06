import { useState } from "react"
import User from "../../../../types/User"
import TableControl from "./TableControl"
import UserTable from "./UserTable"
import Director from "../filters/Director"
import RoleFilter from "../filters/RoleFilter"
import InputFilter from "../filters/InputFilter"

type TableWrapperProps = {
    users: User[]
}
const TableWrapper: React.FC<TableWrapperProps> = (props) => {
    const [displayedUsers, setDisplayedUsers] = useState<User[]>(props.users);
    const dir = new Director(displayedUsers);
    dir.registerManager(new RoleFilter());
    dir.registerManager(new InputFilter());
    const [director, setDirectors] = useState<Director>(dir);
    const handleAll = (): void => {
        setDisplayedUsers(director.handleAll());
    }
    return (
        <div>
            <TableControl setDirectors={setDirectors} />
            <UserTable users={displayedUsers} />
        </div>
    )
}

export default TableWrapper;