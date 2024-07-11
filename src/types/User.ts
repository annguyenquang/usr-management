import { User } from "lucide-react";
import Role from "../enums/Role";

type User = {
    id: number;
    firstName: String;
    lastName: String;
    email: String;
    phone: String;
    role: Role;
}

export default User;