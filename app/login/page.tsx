"use client";

import { useRouter } from "next/navigation";
import { auth } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import  uiConfig  from "../firebaseAuthUiConfig";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

export default function Home() {
    const [user, loading, error] = useAuthState(auth);
    const router = useRouter();

    // if (loading) return <Loading />
    // else if (error) return <Error msg={error} />

    // else
    if (user) {
        // user is already logged in, redirect to home page
        router.push("/");
    }

    return (
        <div>
            <div>
                <h1>Log In</h1>
            </div>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
        </div>
    );
}
