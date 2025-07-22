"use client";

import SignInForm from "@/features/firebaseAuth/components/signInForm";

const Login = () => {
    return (
        <div className="mt-6 flex w-full max-w-md flex-col gap-4">
            <SignInForm />
        </div>
    );
};

export default Login;
