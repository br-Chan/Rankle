import { useEffect, useState } from "react";
import { initialiseAnonymousUser, onAuthStateChange } from "../firebaseConfig";
import { User } from "firebase/auth";

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChange(async (currentUser) => {
            if (!currentUser) {
                const newUser: User = await initialiseAnonymousUser();
                setUser(newUser);
            } else {
                setUser(currentUser);
            }
        });

        return () => unsubscribe();
    }, []);

    return { user };
};
