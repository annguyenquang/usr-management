import { createContext, useEffect, useState } from "react";
import User from "../../../types/User";
import generateUsers from "../../../fakedata/generateUsers";
import TableWrapper from "./child/TableWrapper";

export enum SORT_OPTIONS {
    INCREASE = 1,
    DECREASE = 0
}

export const UserContext = createContext<any>({});

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

    //SORT METHODS
    const sortById = (op: SORT_OPTIONS): void => {
        if (op === SORT_OPTIONS.INCREASE) {
            setUsers([...users.sort((a, b) => a.id - b.id)]);
        } else {
            setUsers([...users.sort((a, b) => b.id - a.id)]);
        }
    }
    const sortByFirstName = (op: SORT_OPTIONS): void => {
        if (op === SORT_OPTIONS.INCREASE) {
            setUsers([...users.sort((a, b) => a.firstName.localeCompare(b.firstName as string))]);
        } else {
            setUsers([...users.sort((a, b) => b.firstName.localeCompare(a.firstName as string))]);
        }
    }
    const sortByLastName = (op: SORT_OPTIONS): void => {
        if (op === SORT_OPTIONS.INCREASE) {
            setUsers([...users.sort((a, b) => a.lastName.localeCompare(b.lastName as string))]);
        } else {
            setUsers([...users.sort((a, b) => b.lastName.localeCompare(a.lastName as string))]);
        }
    }
    const sortByPhone = (op: SORT_OPTIONS): void => {
        if (op === SORT_OPTIONS.INCREASE) {
            setUsers([...users.sort((a, b) => a.phoneNumber.localeCompare(b.phoneNumber as string))]);
        } else {
            setUsers([...users.sort((a, b) => b.phoneNumber.localeCompare(a.phoneNumber as string))]);
        }
    }
    const sortByEmail = (op: SORT_OPTIONS): void => {
        if (op === SORT_OPTIONS.INCREASE) {
            setUsers([...users.sort((a, b) => a.email.localeCompare(b.email as string))]);
        } else {
            setUsers([...users.sort((a, b) => b.email.localeCompare(a.email as string))]);
        }
    }
    const sortByRole = (op: SORT_OPTIONS): void => {
        if (op === SORT_OPTIONS.INCREASE) {
            setUsers([...users.sort((a, b) => a.role.localeCompare(b.role as string))]);
        } else {
            setUsers([...users.sort((a, b) => b.role.localeCompare(a.role as string))]);
        }
    }
    useEffect(() => {
        setUsers(generateUsers(1000));
    }, []);


    return (
        <UserContext.Provider value={
            {
                users: users,
                editUser: editUser,
                sortById: sortById,
                sortByFirstName: sortByFirstName,
                sortByLastName: sortByLastName,
                sortByPhone: sortByPhone,
                sortByEmail: sortByEmail,
                sortByRole: sortByRole,
            }}
        >
            <div className="h-full">
                <TableWrapper sortById={sortById} editUser={editUser} deleteUser={deleteUser} addUser={addUser} users={users}></TableWrapper>
            </div>
        </UserContext.Provider>
    );
}

export default Dashboard;