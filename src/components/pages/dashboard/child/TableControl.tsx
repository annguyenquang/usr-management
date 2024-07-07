import { useState } from "react";
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label.tsx";
import { Button } from "../../../ui/button.tsx";
import { ROLE_OPTIONS } from "./TableWrapper.tsx";
import AddButton from "./AddButton.tsx";
import User from "../../../../types/User.ts";

type TableControlProps = {
    roleOption: number;
    setRoleOption: (role: number) => void;
    setSearchText: (searchText: string) => void;
    rowsPerPage: number;
    setRowsPerPage: (rowsPerPage: number) => void;
    page: number;
    setPage: (page: number) => void;
    exportToXLSX: () => void;
    addUser: (user: User) => void;
}

const TableControl: React.FC<TableControlProps> = (props) => {
    const [tempRowsPerPage, setTempRowsPerPage] = useState<number>(props.rowsPerPage);
    const onRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        props.setRoleOption(parseInt(event.target.value));
    }
    const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        props.setSearchText(event.target.value);
    }
    const onTempRowPerPageChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setTempRowsPerPage(parseInt(event.target.value));
    }

    const onChangeRowPerPages = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        console.log(tempRowsPerPage);
        props.setRowsPerPage(tempRowsPerPage);
    }
    const onPageChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        props.setPage(parseInt(event.target.value));
    }
    const onExport = (): void => {
        props.exportToXLSX();
    }
    return (
        <><div>
            <div className="flex flex-row space-x-1">
                <Input onChange={onSearchChange} />
                <div>
                    <select onChange={onRoleChange}>
                        {ROLE_OPTIONS.map((role, idx) =>
                            <option key={idx} value={idx}>{role}</option>)}
                    </select>
                </div>
                <form onSubmit={onChangeRowPerPages}>
                    <Input value={tempRowsPerPage} type="number" onChange={onTempRowPerPageChange} />
                </form>
                <Label htmlFor="page">Rows per page</Label>
                <Input id="page" value={props.page} type="number" onChange={onPageChange} />
                <Button className="border" onClick={onExport}>Export</Button>
                <AddButton addUser={props.addUser}></AddButton>
            </div >
        </div>
        </>
    )
}
export default TableControl;