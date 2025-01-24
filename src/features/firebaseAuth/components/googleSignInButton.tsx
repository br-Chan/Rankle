import { FcGoogle } from "react-icons/fc";
import { signInAndLinkWithGoogle } from "../api/signIn";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";

const GoogleSignInButton = () => {
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
        <button
            onClick={async () => {
                handleGoogleSignIn();
            }}
            className="transition-colours flex items-center justify-center gap-2 rounded-full bg-amber-400 p-3 text-black duration-300 hover:bg-amber-500"
        >
            <FcGoogle className="h-8 w-8 rounded-full bg-white p-1" />
            Sign in with Google
        </button>
    );
};

export default GoogleSignInButton;
