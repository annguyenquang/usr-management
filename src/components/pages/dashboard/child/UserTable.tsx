import User from "../../../../types/User";

type TableProps = {
    users: User[]
}


const UserTable: React.FC<TableProps> = (props) => {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {props.users.map((user, idx) => (
                        <tr key={idx}>
                            <td>{user.id}</td>
                            <td>{user.firstName}</td>
                            <td>{user.firstName}</td>
                            <td>{user.phoneNumber}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;