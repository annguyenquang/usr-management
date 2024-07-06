import { Input } from "../../../ui/input";
import {ROLE_OPTIONS} from "./TableWrapper.tsx";
type TableControlProps = {
    roleOption: number;
    setRoleOption: (role: number) => void;
}

const TableControl: React.FC<TableControlProps> = (props) => {
    const onRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        props.setRoleOption(parseInt(event.target.value));
    }

    return (
        <>
            <div className="flex flex-row">
                <Input />
                <div>
                    <select onChange={onRoleChange}>
                            {ROLE_OPTIONS.map((role, idx) =>
                            <option key={idx} value={idx}>{role}</option>)}
                    </select>
                </div>

            </div >
        </>
    )
}
export default TableControl;