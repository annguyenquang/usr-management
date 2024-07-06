import Role from "../../../../enums/Role";
import User from "../../../../types/User";
import UserListManager from "./UserListManager";

class RoleFilter extends UserListManager {
    role?: Role;
    constructor(role?: Role) {
        super();
        this.role = role;
    }
    handle = (users: User[]): User[] => {
        if (this.role) {
            return users.filter((usr) => usr.role === this.role);
        }
        return users;
    }

}

export default RoleFilter;