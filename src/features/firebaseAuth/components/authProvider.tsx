"use client";

import { auth } from "@/src/config/firebase";
import { initialiseAnonymousUser } from "@/src/lib/firebaseAuthUtils";
import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from "react";

type AuthContextValue = {
    currentUser: User | null;
    isSignedIn: boolean;
    isUserLoading: boolean;
};

export const AuthContext = createContext<AuthContextValue>({
    currentUser: null,
    isSignedIn: false,
    isUserLoading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [isUserLoading, setIsUserLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            initialiseUser(user);
        });
        return unsubscribe;
    }, []);

    const initialiseUser = async (user: User | null) => {
        if (user) {
            setCurrentUser(user);
            setIsSignedIn(true);
        } else {
            setCurrentUser(null);
            setIsSignedIn(false);

            console.log("user is falsey, creating anon user");
            const newAnonymousUser = await initialiseAnonymousUser();
            setCurrentUser(newAnonymousUser);
            setIsSignedIn(true);
        }

        setIsUserLoading(false);
    };

    const value: AuthContextValue = {
        currentUser,
        isSignedIn,
        isUserLoading,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
