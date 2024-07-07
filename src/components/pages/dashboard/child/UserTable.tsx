import User from "../../../../types/User";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

type TableProps = {
    users: User[]
    deleteUser: (user: User) => void;
    editUser: (user: User) => void;
}


const UserTable: React.FC<TableProps> = (props) => {
    return (
        <div className="bg-[#515151] p-4 w-fit">
            <table id="usr-table" >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {props.users.map((user, idx) => (
                        <tr key={idx}>
                            <td>{user.id}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.phoneNumber}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td><EditButton user={user} editButton={props.editUser} /></td>
                            <td><DeleteButton deleteUser={props.deleteUser} user={user} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;