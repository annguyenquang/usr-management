import { useEffect, useState } from "react";
import User from "../../../types/User";
import generateUsers from "../../../fakedata/generateUsers";
import TableWrapper from "./child/TableWrapper";

const Dashboard: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const addUser = (user: User): void => {
        console.log("User in Dashboard", user);
        setUsers([...users, { ...user, id: users.length + 1 }]);
    };
    const deleteUser = (user: User): void => {
        setUsers(users.filter((u) => u.id !== user.id));
    }
    const editUser = (newUser: User): void => {
        setUsers(users.map((user) => user.id === newUser.id ? newUser : user));
    }
    useEffect(() => {
        setUsers(generateUsers(100));
    }, []);


    return (
        <div className="">
            <h1>Dashboard</h1>
            <TableWrapper editUser={editUser} deleteUser={deleteUser} addUser={addUser} users={users}></TableWrapper>
        </div>
    );
}

export default Dashboard;