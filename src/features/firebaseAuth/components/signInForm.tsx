import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { signInWithEmail } from "../api/signIn";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signInDetails, SignInDetailsSchema } from "../schemas";
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

const SignInForm = () => {
    const { currentUser } = useAuth();

    const router = useRouter();

    const form = useForm<signInDetails>({
        resolver: zodResolver(SignInDetailsSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const [isSigningIn, setIsSigningIn] = useState(false);

    const onSubmit = async (values: signInDetails) => {
        if (!isSigningIn) {
            setIsSigningIn(true);
            if (currentUser) {
                try {
                    await signInWithEmail(values.email, values.password);
                    router.push("/");
                } catch (error: any) {
                    setIsSigningIn(false);
                    handleSignInError(error);
                }
            } else {
                // TODO: handle situation where user is null
            }
        }
    };

    const handleSignInError = (error: any) => {
        if (error.code === "auth/invalid-credential") {
            form.setError("password", {
                type: "manual",
                message: "Wrong email or password",
            });
        } else {
            // TODO: replace with sonner
            form.setError("password", {
                type: "manual",
                message: "sign in got rankled, my bad...",
            });
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Welcome back, Rankler</CardTitle>
                <CardDescription>Enter your email to see your list of saved games.</CardDescription>
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
                    </CardContent>
                    <CardFooter className="grid w-full gap-2">
                        <Button
                            className="bg-rankle hover:bg-rankle-hover text-lg text-black"
                            type="submit"
                        >
                            Login
                        </Button>
                        <span className="text-center text-sm text-muted-foreground">
                            First time?&nbsp;
                            <Link
                                className="hover:text-rankle-text underline hover:no-underline"
                                href="/register"
                            >
                                Create account
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

export default SignInForm;
