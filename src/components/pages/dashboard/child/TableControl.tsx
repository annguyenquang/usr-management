import { useState } from "react";
import { Input } from "../../../ui/input";
import { ROLE_OPTIONS } from "./TableWrapper.tsx";
type TableControlProps = {
    roleOption: number;
    setRoleOption: (role: number) => void;
    setSearchText: (searchText: string) => void;
    rowsPerPage: number;
    setRowsPerPage: (rowsPerPage: number) => void;
}

const TableControl: React.FC<TableControlProps> = (props) => {
    const [tempRowsPerPage, setTempRowsPerPage] = useState<number>(props.rowsPerPage);
    const onRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        props.setRoleOption(parseInt(event.target.value));
    }
    const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.setSearchText(event.target.value);
    }
    const handleChangeTempRowPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTempRowsPerPage(parseInt(event.target.value));
    }

    function onChangeRowPerPages(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        console.log(tempRowsPerPage);
        props.setRowsPerPage(tempRowsPerPage);
    }

    return (
        <>
            <div className="flex flex-row">
                <Input onChange={onSearchChange} />
                <div>
                    <select onChange={onRoleChange}>
                        {ROLE_OPTIONS.map((role, idx) =>
                            <option key={idx} value={idx}>{role}</option>)}
                    </select>
                </div>
                <form onSubmit={onChangeRowPerPages}>
                    <Input value={tempRowsPerPage} type="number" onChange={handleChangeTempRowPerPage} />
                </form>
            </div >
        </>
    )
}
export default TableControl;