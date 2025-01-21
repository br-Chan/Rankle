import {
    signInAnonymously,
    User,
    GoogleAuthProvider,
    linkWithPopup,
    signInWithCredential,
    signInWithEmailAndPassword,
    EmailAuthProvider,
    linkWithCredential,
} from "firebase/auth";
import { auth } from "@/config/firebase";

export const initialiseAnonymousUser = async () => {
    const userCredential = await signInAnonymously(auth);
    return userCredential.user;
};

export const registerAndLinkWithEmail = async (
    initialUser: User,
    email: string,
    password: string
) => {
    try {
        const credential = EmailAuthProvider.credential(email, password);
        await linkWithCredential(initialUser, credential);
    } catch (error) {
        console.error("Error registering with email: ", error);
        throw error;
    }
};

export const signInWithEmail = async (email: string, password: string) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.error("Error signing in with email: ", error);
        throw error;
    }
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
