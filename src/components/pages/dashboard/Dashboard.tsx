import { createContext, useEffect, useState } from "react";
import User from "../../../types/User";
import generateUsers from "../../../fakedata/generateUsers";
import TableWrapper from "./child/TableWrapper";
import React from "react";
import axios, { Axios } from "axios";
import Role from "../../../enums/Role";
import { Phone } from "lucide-react";

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

    const addUser = async (user: User): Promise<void> => {
        try {
            const url = "https://dummyjson.com/users/add";
            const res = await axios({
                url: url,
                method: 'post',
                data: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    phone: user.phone,
                    email: user.email,
                    role: user.role
                }
            })
            console.log("Res.data", res.data);
            setUsers([...users, { ...res.data as User, role: user.role }]);
        } catch (error) {
            console.log(error);
        }
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
        //If text is empty, set page = 1 to return to the first page
        if (text === "") {
            setPage(1);
            return;
        }
        if ((text[0] >= '0' && text[0] <= '9') || text[0] === '+') { // if the first character is a number or '+', search by phone number
            try {
                const res: User[] = await getAllUsers();
                setUsers(res.filter((user) => user.phone.toString().includes(text)));
            } catch (error) {
                console.log(error);
            }
        } else { // case text is not a phone number, search by firstname, lastname, email
            try {
                const url = `https://dummyjson.com/users/search?q=${text}`;
                const res = await axios(url);
                setUsers(res.data.users);
            } catch (error) {
                console.log(error);

            }
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