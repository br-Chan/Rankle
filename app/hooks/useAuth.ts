import { useEffect, useState } from "react";
import { initialiseAnonymousUser, onAuthStateChange } from "../firebaseConfig";

export const useAuth = () => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChange(async (currentUser) => {
            if (!currentUser) {
                const newUser = await initialiseAnonymousUser();
                setUser(newUser);
            } else {
                setUser(currentUser);
            }
        });

        return () => unsubscribe();
    }, []);

    return { user };
};