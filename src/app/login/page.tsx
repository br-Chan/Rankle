"use client";

import { useRouter } from "next/navigation";
import { signInAndLinkWithGoogle } from "../../lib/firebaseAuthUtils";
import { useState } from "react";
import { useAuth } from "@/src/features/firebaseAuth/hooks/useAuth";

export default function Home() {
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
            <h1 className="gap-2 text-center text-2xl font-black">LOGIN</h1>
            <p>Save all your games!</p>
            <div className="mt-10 flex flex-col gap-5">
                <button
                    className="transition-colours rounded-full bg-amber-300 p-4 text-black duration-300 hover:bg-amber-400"
                    onClick={async () => {
                        handleGoogleSignIn();
                    }}
                >
                    Sign in with Google
                </button>
            </div>
        </main>
    );
}
