"use client";

import EmailSignInForm from "@/features/firebaseAuth/components/emailSignInForm";
import SignUpButton from "@/app/login/components/signUpButton";
import GoogleSignInButton from "@/features/firebaseAuth/components/googleSignInButton";
import OrDivider from "./components/orDivider";

const Login = () => {
    return (
        <main className="flex w-[288px] flex-col justify-center text-center md:w-[576px]">
            <h1 className="text-center text-2xl font-black">LOGIN</h1>
            <p>Keep your games safe!</p>

            <div className="mt-4 flex flex-col gap-4">
                <EmailSignInForm />
                <SignUpButton />

                <OrDivider />

                <GoogleSignInButton />
            </div>
        </main>
    );
};

export default Login;
