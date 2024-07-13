import { z } from "zod";
import Role from "../enums/Role";

export const UserSchema = z.object({
    fname: z.string({ required_error: "First name needed" })
        .max(20, { message: "First name must have at most 20 characters" })
        .refine(name => /^[a-zA-Z\s]+$/.test(name),
            { message: "Name cannot contain digits or special characters" }
        ),
    lname: z.string({ required_error: "Last name needed" })
        .max(20, { message: "Last name must have at most 20 characters" })
        .refine(name => /^[a-zA-Z\s]+$/.test(name),
            { message: "Name cannot contain digits or special characters" }
        ),
    email: z.string({ required_error: "Email needed" })
        .email({ message: "Invalid email" }),
    phone: z.string({ required_error: "Phone number needed" })
        .max(20, { message: "Phone number must have at most 20 digits" })
        .min(10, { message: "Phone number must have at least 10 digits" })
        .refine((phone) => /^[\d\s+-]+$/.test(phone),
            {
                message: "Phone number must contain only digits",
            }),
    userRole: z.nativeEnum(Role),
}).required();