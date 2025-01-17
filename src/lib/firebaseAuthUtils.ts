import {
    GoogleAuthProvider,
    linkWithPopup,
    signInAnonymously,
    signInWithCredential,
    signOut as firebaseSignOut,
    User,
} from "firebase/auth";
import { auth } from "@/config/firebase";

export const initialiseAnonymousUser = async () => {
    const userCredential = await signInAnonymously(auth);
    return userCredential.user;
};

export const signInAndLinkWithGoogle = async (initialUser: User) => {
    try {
        const provider = new GoogleAuthProvider();
        await linkWithPopup(initialUser, provider);
    } catch (error: any) {
        if (error.code === "auth/credential-already-in-use") {
            const credential = GoogleAuthProvider.credentialFromError(error);
            await signInWithCredential(auth, credential!);
        } else {
            console.error("Error signing in to Google with popup: ", error);

            throw error;
        }
    }
};

export const signOut = async () => {
    return await firebaseSignOut(auth);
};
