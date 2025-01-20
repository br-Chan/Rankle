import { useState } from "react";

const EmailSignInForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailSignIn = (e: React.FormEvent) => {
        e.preventDefault();

        
    };

    return (
        <form
            onSubmit={handleEmailSignIn}
            className="flex flex-col gap-4 rounded-3xl border-4 border-amber-400 bg-amber-400 bg-opacity-15 p-4"
        >
            <label className="flex flex-col items-center gap-1">
                <span className="font-bold">Email</span>
                <input
                    type="email"
                    name="email"
                    placeholder="rankler@rankmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-md w-3/5 rounded-xl border-2 border-transparent bg-white bg-opacity-50 p-1 px-3 outline-none focus:border-amber-300"
                />
            </label>

            <label className="flex flex-col items-center gap-1">
                <span className="font-bold">Password</span>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="text-md w-3/5 rounded-xl border-2 border-transparent bg-white bg-opacity-50 p-1 px-3 outline-none focus:border-amber-300"
                />
            </label>

            <button type="submit"></button>
        </form>
    );
};

export default EmailSignInForm;
