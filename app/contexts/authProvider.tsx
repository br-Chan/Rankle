"use client";

import { onAuthStateChanged, User } from "firebase/auth";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { initialiseAnonymousUser } from "../lib/firebaseAuthUtils";
import { auth } from "../firebaseConfig";

type AuthContextValue = {
    currentUser?: User;
    isUserLoading: boolean;
};

const AuthContext = createContext<AuthContextValue>({
    currentUser: undefined,
    isUserLoading: true,
});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
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
        } else {
            console.log("user is undefined, creating anon user");
            const newAnonymousUser = await initialiseAnonymousUser();
            setCurrentUser(newAnonymousUser);
        }

        setIsUserLoading(false);
    };

    const value: AuthContextValue = {
        currentUser,
        isUserLoading,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
