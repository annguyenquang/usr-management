import User from "../../../../types/User";
import UserListManager from "./UserListManager";

class InputFilter extends UserListManager {
    input: String = '';
    handle(users: User[]): User[] {
        if (this.input.length > 0) {
            return users.filter((usr) =>
                usr.firstName.includes(this.input as string)
                || usr.lastName.includes(this.input as string)
                || usr.email.includes(this.input as string)
                || usr.phoneNumber.includes(this.input as string));
        }
        return users;
    }
}

export default InputFilter;