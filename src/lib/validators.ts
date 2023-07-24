import { z } from "zod";

export const UserValidator = z.object({
    email: z.string().email(),
    dateOfBirth: z.string(),
    age: z.number(),
    password: z.string(),
});

export type CreateUserPayload = z.infer<typeof UserValidator>;