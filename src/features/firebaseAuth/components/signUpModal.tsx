import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import { registerAndLinkWithEmail } from "../api/signUp";
import ModalContainer from "@/components/modalContainer";

const SignUpModal = ({ onCancel }: { onCancel: () => void }) => {
    const { currentUser } = useAuth();

    const router = useRouter();

    const [isSigningUp, setIsSigningUp] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");

    const [invalidText, setInvalidText] = useState("");

    const handleSignUpError = (error: any) => {
        if (error.code === "auth/weak-password") {
            setInvalidText("puny password");
        } else if (error.code === "auth/email-already-in-use") {
            setInvalidText("email already in use");
        } else {
            setInvalidText("sign up got rankled...");
        }
    };

    const handleEmailSignUp = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isSigningUp) {
            setIsSigningUp(true);
            setInvalidText("");

            try {
                if (currentUser!.isAnonymous) {
                    await registerAndLinkWithEmail(currentUser!, email, password);
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

    return (
        <ModalContainer>
            <form
                onSubmit={handleEmailSignUp}
                className="flex w-full max-w-2xl flex-col items-center gap-4 rounded-2xl border-4 border-amber-400 bg-amber-400 bg-opacity-30 p-4"
            >
                <label className="flex w-3/5 flex-col items-center gap-1">
                    <span className="font-bold">Email</span>
                    <input
                        type="email"
                        name="email"
                        placeholder="rankler@rankmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="text-md w-full rounded-xl border-2 border-transparent bg-white bg-opacity-50 p-1 px-3 outline-none focus:border-amber-400 dark:placeholder-gray-600"
                    />
                </label>

                <label className="flex w-3/5 flex-col items-center gap-1">
                    <span className="font-bold">Password</span>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="text-md w-full rounded-xl border-2 border-transparent bg-white bg-opacity-50 p-1 px-3 outline-none focus:border-amber-400"
                    />
                </label>

                <label className="flex w-3/5 flex-col items-center gap-1">
                    <span className="font-bold">Verify Password</span>
                    <input
                        type="password"
                        name="repeatedPassword"
                        value={repeatedPassword}
                        onChange={(e) => setRepeatedPassword(e.target.value)}
                        className="text-md w-full rounded-xl border-2 border-transparent bg-white bg-opacity-50 p-1 px-3 outline-none focus:border-amber-300"
                    />
                </label>

                <div className="flex flex-col items-center gap-2">
                    <span hidden={!invalidText} className="text-sm text-red-500">
                        {invalidText}
                    </span>
                    <button
                        type="submit"
                        disabled={
                            !email || !password || password !== repeatedPassword || isSigningUp
                        }
                        className="transition-colours w-fit rounded-lg bg-amber-400 px-4 py-2 text-black duration-300 hover:bg-amber-500 disabled:pointer-events-none disabled:opacity-50 disabled:transition-none"
                    >
                        Sign up
                    </button>
                    <button type="button" onClick={onCancel} className="text-sm hover:underline">
                        cancel
                    </button>
                </div>
            </form>
        </ModalContainer>
    );
};

export default SignUpModal;
