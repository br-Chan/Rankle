"use client";

import { useEffect } from "react";
import { getAuth, GoogleAuthProvider, EmailAuthProvider } from "firebase/auth";
import firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css"; // Import FirebaseUI CSS
import { auth } from "@/app/firebaseConfig";

const Auth = () => {
    useEffect(() => {
        const ui = new firebaseui.auth.AuthUI(auth);

        ui.start("#firebaseui-auth-container", {
            signInOptions: [
                EmailAuthProvider.PROVIDER_ID,
                GoogleAuthProvider.PROVIDER_ID,
            ],
            // Other config options...
        });
    }, []);

    return <div id="firebaseui-auth-container"></div>;
};

export default Auth;