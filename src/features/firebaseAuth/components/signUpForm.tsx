import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { signInWithEmail } from "../api/signIn";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import GoogleSignInButton from "./googleSignInButton";
import OrDivider from "@/features/firebaseAuth/components/orDivider";
import Link from "next/link";
import { signUpDetails, SignUpDetailsSchema } from "../schemas";
import { registerAndLinkWithEmail } from "../api/signUp";

const SignUpform = () => {
    const { currentUser } = useAuth();

    const router = useRouter();

    const form = useForm<signUpDetails>({
        resolver: zodResolver(SignUpDetailsSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const [isSigningUp, setIsSigningUp] = useState(false);

    const onSubmit = async (values: signUpDetails) => {
        if (!isSigningUp) {
            setIsSigningUp(true);
            try {
                if (currentUser!.isAnonymous) {
                    await registerAndLinkWithEmail(currentUser!, values.email, values.password);
                    await currentUser!.getIdToken(true);
                } else {
                    // TODO: handle situation where user is already signed in (can't even happen?)
                }
                router.push("/");
            } catch (error) {
                setIsSigningUp(false);
                handleSignUpError(error);
            }
        }
    };

    const handleSignUpError = (error: any) => {
        if (error.code === "auth/weak-password") {
            form.setError("password", {
                type: "manual",
                message: "Password must contain at least 6 letters",
            });
        } else if (error.code === "auth/email-already-in-use") {
            form.setError("email", {
                type: "manual",
                message: "Email already in use",
            });
        } else {
            // TODO: replace with sonner
            form.setError("password", {
                type: "manual",
                message: "sign up got rankled, my bad...",
            });
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create Account</CardTitle>
                <CardDescription>
                    Sign up to save your list of games and add more to Rankle.
                </CardDescription>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardContent className="grid w-full gap-2">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="rankler@rankmail.com"
                                            {...field}
                                            className={cn(
                                                form.formState.errors.email && "border-destructive"
                                            )}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="password"
                                            className={cn(
                                                form.formState.errors.password &&
                                                    "border-destructive"
                                            )}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="password"
                                            className={cn(
                                                form.formState.errors.password &&
                                                    "border-destructive"
                                            )}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter className="grid w-full gap-2">
                        <Button
                            className="bg-amber-400 text-lg text-black hover:bg-amber-500"
                            type="submit"
                        >
                            Sign Up
                        </Button>
                        <span className="text-center text-sm text-muted-foreground">
                            Already signed up?&nbsp;
                            <Link
                                className="underline hover:text-amber-600 hover:no-underline"
                                href="/login"
                            >
                                Login
                            </Link>
                        </span>

                        <OrDivider />
                        <GoogleSignInButton />
                    </CardFooter>
                </form>
            </Form>
        </Card>
    );
};

export default SignUpform;
