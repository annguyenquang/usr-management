import { User } from "lucide-react";
import Role from "../enums/Role";

type User = {
    id: String;
    firstName: String;
    lastName: String;
    email: String;
    phoneNumber: String;
    role: Role;
}

export default User;