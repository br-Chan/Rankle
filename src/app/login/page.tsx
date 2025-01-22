"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/features/firebaseAuth/hooks/useAuth";
import { signInAndLinkWithGoogle } from "@/features/firebaseAuth/utils/signIn";
import { FcGoogle } from "react-icons/fc";
import EmailSignInForm from "@/features/firebaseAuth/components/emailSignInForm";
import SignUpButton from "@/app/login/components/signUpButton";

const Login = () => {
    const { currentUser } = useAuth();

    const router = useRouter();

    const [isSigningIn, setIsSigningIn] = useState(false);

    const handleGoogleSignIn = async () => {
        if (!isSigningIn) {
            setIsSigningIn(true);

            if (currentUser) {
                try {
                    await signInAndLinkWithGoogle(currentUser);
                    router.push("/");
                } catch (error) {
                    setIsSigningIn(false);
                    // TODO: handle situation where sign in causes uncaught error
                }
            } else {
                // TODO: handle situation where user is null
            }
        }
    };

    return (
        <main className="flex w-[288px] flex-col justify-center text-center md:w-[576px]">
            <h1 className="text-center text-2xl font-black">LOGIN</h1>
            <p>Save all your games!</p>

            <div className="mt-4 flex flex-col gap-5">
                <EmailSignInForm />
                ------------- OR -------------
                <button
                    onClick={async () => {
                        handleGoogleSignIn();
                    }}
                    className="transition-colours flex items-center justify-center gap-2 rounded-full bg-amber-400 p-3 text-black duration-300 hover:bg-amber-500"
                >
                    <FcGoogle className="h-8 w-8 rounded-full bg-white p-1" />
                    Sign in with Google
                </button>
                <SignUpButton />
            </div>
        </main>
    );
};

export default Login;
