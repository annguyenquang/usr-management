import { Input } from "../../../ui/input.tsx";
import { Button } from "../../../ui/button.tsx";
import { ROLE_OPTIONS } from "./TableWrapper.tsx";
import AddButton from "./AddButton.tsx";
import User from "../../../../types/User.ts";
import React, { useContext, useEffect } from "react";
import { useDebounce } from "../../../../hooks/useDebounce.ts";
import { UserContext } from "../Dashboard.tsx";

type TableControlProps = {
    roleOption: number;
    setRoleOption: (role: number) => void;
    setSearchText: (searchText: string) => void;
    exportToXLSX: () => void;
    addUser: (user: User) => void;
}

const TableControl: React.FC<TableControlProps> = (props) => {
    const { setRoleFilter, getUserByText } = useContext(UserContext);
    const [searchText, setSearchText] = React.useState<string>("");
    const debouncedSearchText = useDebounce<string>(searchText, 800);
    useEffect(() => {
        getUserByText(searchText);
        // props.setSearchText(searchText);
    }, [debouncedSearchText]);
    const onRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRoleFilter(event.target.value);
        // props.setRoleOption(parseInt(event.target.value));
    }
    const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchText(event.target.value);
    }
    const onExport = (): void => {
        props.exportToXLSX();
    }
    return (
        <><div>
            <div className="flex flex-row justify-between space-x-1">
                <div className="flex space-x-5">
                    <Input className="w-96 border-2 rounded-none bg-[#515151]" placeholder="Search items..." onChange={onSearchChange} />
                    <div className="flex space-x-3 items-center">
                        <div className="flex items-center space-x">
                            <label htmlFor="role-filter" className="text-[15px]">Role</label>
                            <svg className="text-white" width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 1.5C5 1.22386 4.77614 1 4.5 1C4.22386 1 4 1.22386 4 1.5L4 7C4 7.01671 4.00082 7.03323 4.00242 7.04952C2.86009 7.28022 2 8.28967 2 9.5C2 10.7103 2.86009 11.7198 4.00242 11.9505C4.00082 11.9668 4 11.9833 4 12V13.5C4 13.7761 4.22386 14 4.5 14C4.77614 14 5 13.7761 5 13.5V12C5 11.9833 4.99918 11.9668 4.99758 11.9505C6.1399 11.7198 7 10.7103 7 9.5C7 8.28967 6.1399 7.28022 4.99758 7.04952C4.99918 7.03323 5 7.01671 5 7L5 1.5ZM11 1.5C11 1.22386 10.7761 1 10.5 1C10.2239 1 10 1.22386 10 1.5V3C10 3.01671 10.0008 3.03323 10.0024 3.04952C8.8601 3.28022 8 4.28967 8 5.5C8 6.71033 8.8601 7.71978 10.0024 7.95048C10.0008 7.96677 10 7.98329 10 8V13.5C10 13.7761 10.2239 14 10.5 14C10.7761 14 11 13.7761 11 13.5V8C11 7.98329 10.9992 7.96677 10.9976 7.95048C12.1399 7.71978 13 6.71033 13 5.5C13 4.28967 12.1399 3.28022 10.9976 3.04952C10.9992 3.03323 11 3.01671 11 3V1.5ZM4.5 8C3.67157 8 3 8.67157 3 9.5C3 10.3284 3.67157 11 4.5 11C5.32843 11 6 10.3284 6 9.5C6 8.67157 5.32843 8 4.5 8ZM9 5.5C9 4.67157 9.67157 4 10.5 4C11.3284 4 12 4.67157 12 5.5C12 6.32843 11.3284 7 10.5 7C9.67157 7 9 6.32843 9 5.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                        </div>
                        <select id="role-filter" className="h-full bg-[#515151] border-2 border-white text-white hover:bg-slate-400 hover:cursor-pointer" onChange={onRoleChange}>
                            {ROLE_OPTIONS.map((role, idx) =>
                                <option key={idx} value={role}>{role.slice(0, 1).toUpperCase() + role.slice(1)}</option>)}
                        </select>
                    </div>
                </div>
                <div className="flex space-x-3">
                    <Button className="border-2 rounded-none bg-[#515151] hover:bg-slate-400 hover:cursor-pointer" onClick={onExport}>Export</Button>
                    <AddButton addUser={props.addUser}></AddButton>
                </div>
            </div >
        </div>
        </>
    )
}
export default TableControl;