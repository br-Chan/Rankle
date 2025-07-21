import { FcGoogle } from "react-icons/fc";
import { signInAndLinkWithGoogle } from "../api/signIn";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

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
        <Button
            className="text-md bg-white text-black hover:bg-gray-50"
            onClick={handleGoogleSignIn}
            type="button"
        >
            <FcGoogle />
            Sign in with Google
        </Button>
    );
};

export default GoogleSignInButton;
