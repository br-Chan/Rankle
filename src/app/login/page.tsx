"use client";

import EmailSignInForm from "@/features/firebaseAuth/components/emailSignInForm";
import SignUpButton from "@/app/login/components/signUpButton";
import GoogleSignInButton from "@/features/firebaseAuth/components/googleSignInButton";
import OrDivider from "./components/orDivider";

const Login = () => {
    return (
        <>
            <h1 className="text-2xl font-black">LOGIN</h1>
            <p>Keep your games safe!</p>

            <div className="mt-6 flex w-full flex-col gap-4 md:w-[576px]">
                <div className="flex flex-col gap-1">
                    <EmailSignInForm />
                    <SignUpButton />
                </div>

                <OrDivider />

                <GoogleSignInButton />
            </div>
        </>
    );
};

export default Login;
