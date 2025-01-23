import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { registerAndLinkWithEmail } from "../utils/signUp";
import { useRouter } from "next/navigation";

const SignUpModal = ({ onCancel }: { onCancel: () => void }) => {
    const { currentUser } = useAuth();

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");

    const [isSigningUp, setIsSigningUp] = useState(false);

    const handleEmailSignUp = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isSigningUp) {
            // if (password !== repeatedPassword) {
            //     return;
            // }

            setIsSigningUp(true);

            try {
                if (currentUser!.isAnonymous) {
                    console.log("registering and linking");
                    await registerAndLinkWithEmail(currentUser!, email, password);
                    await currentUser!.getIdToken(true);
                } else {
                    // TODO: handle situation where user is already signed in (can't even happen?)
                }
                router.push("/");
            } catch (error) {
                setIsSigningUp(false);
                // TODO: handle situation where sign in causes uncaught error
            }
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="w-full max-w-lg rounded-3xl bg-gray-300">
                <form
                    onSubmit={handleEmailSignUp}
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
                            className="text-md w-full rounded-xl border-2 border-transparent bg-white bg-opacity-50 p-1 px-3 outline-none focus:border-amber-400"
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
                            value={password}
                            onChange={(e) => setRepeatedPassword(e.target.value)}
                            className="text-md w-full rounded-xl border-2 border-transparent bg-white bg-opacity-50 p-1 px-3 outline-none focus:border-amber-300"
                        />
                    </label>

                    <button
                        type="submit"
                        disabled={isSigningUp}
                        className="transition-colours w-fit rounded-lg bg-amber-400 px-4 py-2 text-black duration-300 hover:bg-amber-500 disabled:pointer-events-none disabled:opacity-50 disabled:transition-none"
                    >
                        Sign up
                    </button>

                    <button type="button" onClick={onCancel} className="text-sm hover:underline">
                        cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUpModal;
