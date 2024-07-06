import { useEffect, useState } from "react";
import User from "../../../types/User";
import generateUsers from "../../../fakedata/generateUsers";
import TableWrapper from "./child/TableWrapper";

const Dashboard: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        setUsers(generateUsers(100));
    }, []);


    return (
        <div>
            <h1>Dashboard</h1>
            <TableWrapper users={users}></TableWrapper>
        </div>
    );
}

export default Dashboard;