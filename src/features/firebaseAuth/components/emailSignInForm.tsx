import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { signInWithEmail } from "../utils/signIn";
import { useRouter } from "next/navigation";

const EmailSignInForm = () => {
    const { currentUser } = useAuth();

    const router = useRouter();

    const [isSigningIn, setIsSigningIn] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailSignIn = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isSigningIn) {
            setIsSigningIn(true);

            if (currentUser) {
                try {
                    await signInWithEmail(email, password);
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
        <form
            onSubmit={handleEmailSignIn}
            className="flex flex-col items-center gap-4 rounded-2xl border-4 border-amber-400 bg-amber-400 bg-opacity-30 p-4"
        >
            <label className="flex w-3/5 flex-col items-center gap-1">
                <span className="font-bold">Email</span>
                <input
                    type="email"
                    name="email"
                    placeholder="rankler@rankmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border-2 border-transparent bg-white bg-opacity-50 p-1 px-3 outline-none focus:border-amber-400 dark:placeholder-gray-600"
                />
            </label>

            <label className="flex w-3/5 flex-col items-center gap-1">
                <span className="font-bold">Password</span>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border-2 border-transparent bg-white bg-opacity-50 p-1 px-3 outline-none focus:border-amber-400"
                />
            </label>

            <button
                type="submit"
                disabled={isSigningIn}
                className="transition-colours w-fit rounded-lg bg-amber-400 px-4 py-2 text-black duration-300 hover:bg-amber-500 disabled:pointer-events-none disabled:opacity-50 disabled:transition-none"
            >
                Sign in
            </button>
        </form>
    );
};

export default EmailSignInForm;
