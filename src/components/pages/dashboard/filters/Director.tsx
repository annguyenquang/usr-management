import User from "../../../../types/User";
import UserListManager from "./UserListManager";

class Director {
    users: User[];
    managers: UserListManager[] = [];
    constructor(users: User[]) {
        this.users = users;
    }
    registerManager = (manager: UserListManager): void => {
        this.managers.forEach(m => {
            if (this.constructor.name === m.constructor.name) {
                throw new Error('Manager already registered');
            }
        })
        this.managers.push(manager);
    }
    handleAll = (): User[] => {
        let users = this.users;
        this.managers.forEach((manager) => {
            users = manager.handle(users);
        });
        return users;
    }
}

export default Director;