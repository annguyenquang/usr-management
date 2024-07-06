import User from "../../../../types/User";

export default abstract class UserListManager {
    nextManager?: UserListManager;
    abstract handle(users: User[]): User[];
}

