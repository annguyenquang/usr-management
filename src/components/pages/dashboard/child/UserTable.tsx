import { useEffect } from "react";
import User from "../../../../types/User";
import Director from "../filters/Director";
import RoleFilter from "../filters/RoleFilter";
import InputFilter from "../filters/InputFilter";

type TableProps = {
    users: User[]
}


const UserTable: React.FC<TableProps> = (props) => {
    const director = new Director(props.users);
    director.registerManager(new RoleFilter());
    director.registerManager(new InputFilter());

    useEffect(() => {
        director.handleAll();
    }, [director]);
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
                    </tr>
                </thead>
                <tbody>
                    {props.users.map((user) => (
                        <tr >
                            <td>{user.id}</td>
                            <td>{user.firstName}</td>
                            <td>{user.firstName}</td>
                            <td>{user.phoneNumber}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;