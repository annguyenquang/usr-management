import { Input } from "../../../ui/input";
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
    const onRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        props.setRoleOption(parseInt(event.target.value));
    }
    const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        props.setSearchText(event.target.value);
    }
    const onExport = (): void => {
        props.exportToXLSX();
    }
    return (
        <><div>
            <div className="flex flex-row justify-between space-x-1">
                <div className="flex space-x-4">
                    <Input className="w-96" onChange={onSearchChange} />
                    <div>
                        <select onChange={onRoleChange}>
                            {ROLE_OPTIONS.map((role, idx) =>
                                <option key={idx} value={idx}>{role}</option>)}
                        </select>
                    </div>
                </div>
                <div className="flex space-x-3">
                    <Button className="border" onClick={onExport}>Export</Button>
                    <AddButton addUser={props.addUser}></AddButton>
                </div>
            </div >
        </div>
        </>
    )
}
export default TableControl;