import { z } from "zod";

export const SignInDetailsSchema = z.object({
    email: z.email(),
    password: z.string().min(1),
});

export const SignUpDetailsSchema = z
    .object({
        email: z.email(),
        password: z.string().min(6, "Password must contain at least 6 letters"),
        confirmPassword: z.string(),
    })
    .refine(({ password, confirmPassword }) => password === confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

export type signInDetails = z.infer<typeof SignInDetailsSchema>;
export type signUpDetails = z.infer<typeof SignUpDetailsSchema>;
