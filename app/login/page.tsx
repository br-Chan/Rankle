"use client";

import { useRouter } from "next/navigation";
import { signInAndLinkWithGoogle, signOut } from "../lib/firebaseAuthUtils";
import { useAuth } from "../contexts/authProvider";

/**
 * Page where users can create their own games.
 *
 * @returns Create form page
 */
export default function Home() {
    const { currentUser } = useAuth();

    const router = useRouter();

    const handleGoogleSignIn = async () => {
        if (currentUser) {
            await signInAndLinkWithGoogle(currentUser);
            router.push("/");
        } else {
            // TODO: handle situation where user is null
        }
    };

    return (
        <main className="flex w-[288px] flex-col justify-center text-center md:w-[576px]">
            <h1 className="gap-2 text-center text-2xl font-black">LOGIN</h1>
            <p>Save all your games for easy access!</p>
            <button
                className="rounded-full bg-white p-4 hover:bg-zinc-100"
                onClick={async () => {
                    handleGoogleSignIn();
                }}
            >
                Sign in with Google
            </button>
            <button
                className="rounded-full bg-white p-4 hover:bg-zinc-100"
                onClick={async () => {
                    console.log("Signing out...");
                    await signOut();
                    router.push("/");
                }}
            >
                Sign out!
            </button>
        </main>
    );
}
