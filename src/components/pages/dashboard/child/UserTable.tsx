import { useContext, useState } from "react";
import { SORT_OPTIONS, UserContext } from "../Dashboard";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import User from "../../../../types/User";

type TableProps = {
    users: User[]
    deleteUser: (user: User) => void;
    editUser: (user: User) => void;
    sortById: (op: SORT_OPTIONS) => void;
}


const UserTable: React.FC<TableProps> = (props) => {
    const { sortById, sortByFirstName, sortByLastName, sortByEmail, sortByPhone, sortByRole } = useContext(UserContext);
    const [idSort, setIdSort] = useState<SORT_OPTIONS>(SORT_OPTIONS.INCREASE);
    const [nameSort, setNameSort] = useState<SORT_OPTIONS>(SORT_OPTIONS.INCREASE);
    const onSortById = () => {
        if (idSort === SORT_OPTIONS.INCREASE) {
            sortById(SORT_OPTIONS.INCREASE);
            setIdSort(SORT_OPTIONS.DECREASE);
        } else {
            sortById(SORT_OPTIONS.DECREASE);
            setIdSort(SORT_OPTIONS.INCREASE);
        }
    }
    const onSortByFirstName = () => {
        if (nameSort === SORT_OPTIONS.INCREASE) {
            sortByFirstName(SORT_OPTIONS.INCREASE);
            setNameSort(SORT_OPTIONS.DECREASE);
        } else {
            sortByFirstName(SORT_OPTIONS.DECREASE);
            setNameSort(SORT_OPTIONS.INCREASE);
        }
    }
    const onSortByLastName = () => {
        if (nameSort === SORT_OPTIONS.INCREASE) {
            sortByLastName(SORT_OPTIONS.INCREASE);
            setNameSort(SORT_OPTIONS.DECREASE);
        } else {
            sortByLastName(SORT_OPTIONS.DECREASE);
            setNameSort(SORT_OPTIONS.INCREASE);
        }
    }
    const onSortByPhone = () => {
        if (nameSort === SORT_OPTIONS.INCREASE) {
            sortByPhone(SORT_OPTIONS.INCREASE);
            setNameSort(SORT_OPTIONS.DECREASE);
        } else {
            sortByPhone(SORT_OPTIONS.DECREASE);
            setNameSort(SORT_OPTIONS.INCREASE);
        }
    }
    const onSortByEmail = () => {
        if (nameSort === SORT_OPTIONS.INCREASE) {
            sortByEmail(SORT_OPTIONS.INCREASE);
            setNameSort(SORT_OPTIONS.DECREASE);
        } else {
            sortByEmail(SORT_OPTIONS.DECREASE);
            setNameSort(SORT_OPTIONS.INCREASE);
        }
    }
    const onSortByRole = () => {
        if (nameSort === SORT_OPTIONS.INCREASE) {
            sortByRole(SORT_OPTIONS.INCREASE);
            setNameSort(SORT_OPTIONS.DECREASE);
        } else {
            sortByRole(SORT_OPTIONS.DECREASE);
            setNameSort(SORT_OPTIONS.INCREASE);
        }
    }

    return (
        <div className="bg-[#515151]">
            <table id="usr-table" className="w-full table-auto border-spacing-11">
                <thead>
                    <tr className="bg-slate-800">
                        <th className="w-[50px] font-thin">ID
                            <svg onClick={onSortById} className="inline ml-1 hover:bg-slate-400 hover: cursor-pointer rounded" width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                        </th>
                        <th className="w-[100px] text-[14px] font-thin text-start ">
                            <div className="flex justify-between">
                                First Name
                                <svg onClick={onSortByFirstName} className="inline ml-1 hover:bg-slate-400 hover: cursor-pointer rounded" width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                            </div>
                        </th>
                        <th className="w-[100px] text-[14px] font-thin text-start">
                            <div className="flex justify-between">
                                Last Name
                                <svg onClick={onSortByLastName} className="inline ml-1 hover:bg-slate-400 hover: cursor-pointer rounded" width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                            </div>
                        </th>
                        <th className="w-[150px] text-[14px] font-thin text-start">
                            <div className="flex justify-between">
                                Phone
                                <svg onClick={onSortByPhone} className="inline ml-1 hover:bg-slate-400 hover: cursor-pointer rounded" width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                            </div>
                        </th>
                        <th className="w-[230px] text-[14px] font-thin mr-2 text-start">
                            <div className="flex justify-between">
                                Email
                                <svg onClick={onSortByEmail} className="inline ml-1 hover:bg-slate-400 hover: cursor-pointer rounded" width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                            </div>
                        </th>
                        <th className="w-[100px] text-[14px] font-thin text-start">
                            <div className="flex justify-between">
                                Role
                                <svg onClick={onSortByRole} className="inline ml-1 hover:bg-slate-400 hover: cursor-pointer rounded" width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {props.users.map((user, idx) => (
                        <tr key={idx} className="m-4">
                            <td className="font-semibold">{user.id}</td>
                            <td className="font-semibold">{user.firstName}</td>
                            <td className="font-semibold">{user.lastName}</td>
                            <td className="font-semibold">{user.phoneNumber}</td>
                            <td className="font-semibold">{user.email}</td>
                            <td className="font-semibold">{user.role}</td>
                            <td className="font-semibold"><EditButton user={user} editButton={props.editUser} /></td>
                            <td className="font-semibold"><DeleteButton deleteUser={props.deleteUser} user={user} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;