import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { signInWithEmail } from "../api/signIn";
import { useRouter } from "next/navigation";

const EmailSignInForm = () => {
    const { currentUser } = useAuth();

    const router = useRouter();

    const [isSigningIn, setIsSigningIn] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [invalidText, setInvalidText] = useState("");

    const handleSignInError = (error: any) => {
        if (error.code === "auth/invalid-credential") {
            setInvalidText("wrong username or password");
        } else {
            setInvalidText("sign in got rankled...");
        }
    };

    const handleEmailSignIn = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isSigningIn) {
            setIsSigningIn(true);
            setInvalidText("");

            if (currentUser) {
                try {
                    await signInWithEmail(email, password);
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

    return (
        <form
            onSubmit={handleEmailSignIn}
            className="flex flex-col items-center gap-4 rounded-2xl border-4 border-amber-400 bg-amber-400 bg-opacity-30 p-3"
        >
            <label className="flex w-full flex-col items-center gap-1 sm:w-3/5">
                <span className="font-bold">Email</span>
                <input
                    type="email"
                    name="email"
                    placeholder="rankler@rankmail.com"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setInvalidText("");
                    }}
                    className="w-full rounded-xl border-2 border-transparent bg-white bg-opacity-50 p-1 px-3 outline-none focus:border-amber-400 dark:placeholder-gray-600"
                />
            </label>

            <label className="flex w-full flex-col items-center gap-1 sm:w-3/5">
                <span className="font-bold">Password</span>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setInvalidText("");
                    }}
                    className="w-full rounded-xl border-2 border-transparent bg-white bg-opacity-50 p-1 px-3 outline-none focus:border-amber-400"
                />
            </label>

            <div className="flex flex-col items-center gap-2">
                <span hidden={!invalidText} className="text-sm text-rose-600">
                    {invalidText}
                </span>

                <button
                    type="submit"
                    disabled={!email || !password || isSigningIn}
                    className="transition-colours w-fit rounded-lg bg-amber-400 px-4 py-2 text-black duration-300 hover:bg-amber-500 disabled:pointer-events-none disabled:opacity-50 disabled:transition-none"
                >
                    Sign in
                </button>
            </div>
        </form>
    );
};

export default EmailSignInForm;
