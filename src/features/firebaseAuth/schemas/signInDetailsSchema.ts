import { z } from "zod";

export const SignInDetailsSchema = z.object({
    email: z.email(),
    password: z.string().min(1),
});

export type signInDetails = z.infer<typeof SignInDetailsSchema>;
