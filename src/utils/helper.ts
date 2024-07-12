import User from "../types/User";

export const filterUserProps = (user: any): User => {
    return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        image: user.image
    };
};

export const getChangeProps = <T>(newVal: T, oldVal: T, get: "new" | "old" = "new"): Partial<T> => {
    const changedProps: Partial<T> = {};

    for (const key in oldVal) {
        if (oldVal[key as keyof T] !== newVal[key as keyof T]) {
            switch (get) {
                case "new":
                    changedProps[key as keyof T] = newVal[key as keyof T];
                    break;
                case "old":
                    changedProps[key as keyof T] = oldVal[key as keyof T];
                    break;
                default: break;
            }
        }
    }

    return changedProps;
}