import { createContext, useEffect, useState } from "react";
import User from "../../../types/User";
import generateUsers from "../../../fakedata/generateUsers";
import TableWrapper from "./child/TableWrapper";
import React from "react";
import axios from "axios";
import Role from "../../../enums/Role";

export const UserContext = createContext<any>({})
export const ROLE_OPTIONS = ["All", ...Object.values(Role).map((role: Role) => role as string)];

export enum ORDER {
    ASC = "asc",
    DESC = "desc"
}

const Dashboard: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [totalUsers, setTotalUsers] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [rowPerPage, setRowPerPage] = useState<number>(15);
    const [roleFilter, setRoleFilter] = useState<string>("All");
    const [order, setOrder] = useState<ORDER>(ORDER.ASC);
    const addUser = (user: User): void => {
        setUsers([...users, { ...user, id: users.length + 1 }]);
    };
    const deleteUser = (user: User): void => {
        setUsers(users.filter((u) => u.id !== user.id));
    }
    const editUser = (newUser: User): void => {
        setUsers(users.map((user) => user.id === newUser.id ? newUser : user));
    }
    //SORT METHODS
    const sortUsers = async (by: String, o?: ORDER) => {
        try {
            const url = `https://dummyjson.com/users?sortBy=${by}&order=${o ?? order}`;
            const res = await axios(url);
            setUsers(res.data.users);
            setOrder(o ?? order === ORDER.ASC ? ORDER.DESC : ORDER.ASC);
        } catch (error) {
            console.log(error);
        }
    }
    //USE EFFECTS
    //GET MOCK DATA FROM API
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const skip = (page - 1) * rowPerPage;
                const limit = rowPerPage;
                const url = `https://dummyjson.com/users?skip=${skip}&limit=${limit}`;
                const res = await axios(url);
                setUsers(res.data.users);
                console.log("res.data", res.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchUser();
    }, [page, rowPerPage]);
    useEffect(() => {
        console.log("ResUser", users);
    }, [users]);

    //GET TOTAL USERS
    useEffect(() => {
        const getTotalUsers = async () => {
            try {
                const url = `https://dummyjson.com/users?limit=0`;
                const res = await axios(url);
                setTotalUsers(res.data.total);
            } catch (error) {
                console.log(error);
            }
        }
        getTotalUsers();
    }, []);

    useEffect(() => {
        // Set page to 1 whenever role filter changes
        setPage(1);
        const filterUser = async (by: string, p: number, rows: number) => {
            try {
                const skip = (page - 1) * rows;
                const limit = rows;
                const url = by !== "All" ? //IF by = All then get all user, else get users by role
                    `https://dummyjson.com/users/filter?key=role&value=${by as string}&skip=${skip}&limit=${limit}`
                    : `https://dummyjson.com/users?skip=${skip}&limit=${limit}`;
                const res = await axios(url);
                setUsers(res.data.users);
            } catch (error) {
                console.log(error);
            }
        }
        filterUser(roleFilter, 1, rowPerPage);
    }, [roleFilter]);

    const getAllUsers = async (): Promise<User[]> => {
        try {
            const url = `https://dummyjson.com/users?limit=${totalUsers}`;
            const res = await axios(url);
            return res.data.users;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    const getUserByText = async (text: string) => {
        try {
            const url = `https://dummyjson.com/users/search?q=${text}`;
            const res = await axios(url);
            setUsers(res.data.users);
        } catch (error) {
            console.log(error);
        }
    }

    //GET FAKE DATA
    // useEffect(() => {
    //     const getUsers = async () => {
    //         setUsers(await generateUsers(100));
    //     }
    //     getUsers();
    // }, []);


    return (
        <UserContext.Provider value={
            {
                users: users,
                totalUsers: totalUsers,
                editUser: editUser,
                page: page,
                rowPerPage: rowPerPage,
                setPage: setPage,
                setRowPerPage: setRowPerPage,
                setRoleFilter: setRoleFilter,
                sortUsers: sortUsers,
                getUserByText: getUserByText
            }}>
            <div className="h-full">
                <TableWrapper editUser={editUser} deleteUser={deleteUser} addUser={addUser} users={users}></TableWrapper>
            </div>
        </UserContext.Provider>
    );
}

export default Dashboard;