// src/utils/generateUsers.ts

import Role from "../enums/Role";
import User from "../types/User";

const generateFirstName = (): string => {
    const names = ["John", "Jane", "Alice", "Bob", "Charlie", "Emma", "David", "Olivia", "James", "Sophia"];
    return names[Math.floor(Math.random() * names.length)];
};

const generateLastName = (): string => {
    const names = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor"];
    return names[Math.floor(Math.random() * names.length)];
};

const generateRandomEmail = (name: string) => {
    const domains = ["example.com", "mail.com", "test.com"];
    return `${name.toLowerCase()}@${domains[Math.floor(Math.random() * domains.length)]}`;
};

const generateRandomRole = () => {
    const roles = [Role.ADMIN, Role.USER, Role.EDITOR];
    return roles[Math.floor(Math.random() * roles.length)];
};

const generateRandomPhoneNumber = () => {
    let num = '0';
    for (let i = 0; i < 9; i++) {
        num += Math.floor(Math.random() * 10);
    }
    return num;
}


const generateUsers = (quantity: number): User[] => {
    const users: User[] = [];
    let tempUser: User;
    for (let i = 0; i < quantity; i++) {
        tempUser = {
            id: '' + i,
            firstName: generateFirstName(),
            lastName: generateLastName(),
            role: generateRandomRole(),
            phoneNumber: generateRandomPhoneNumber(),
            email: ''
        }
        tempUser.email = generateRandomEmail(`${tempUser.firstName}${tempUser.lastName}`);
        users.push(tempUser);
    }
    return users;
};

export default generateUsers;