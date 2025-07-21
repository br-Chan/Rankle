import {
    signInAnonymously,
    User,
    GoogleAuthProvider,
    linkWithPopup,
    signInWithCredential,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/config/firebase";
import { toast } from "sonner";

export const initialiseAnonymousUser = async (): Promise<User> => {
    const userCredential = await signInAnonymously(auth);
    return userCredential.user;
};

export const signInWithEmail = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success("Successfully signed in!");
};

export const signInAndLinkWithGoogle = async (initialUser: User) => {
    try {
        const provider = new GoogleAuthProvider();
        await linkWithPopup(initialUser, provider);
        toast.success("Successfully signed up!");
    } catch (error: any) {
        if (error.code === "auth/credential-already-in-use") {
            const credential = GoogleAuthProvider.credentialFromError(error);
            await signInWithCredential(auth, credential!);
            toast.success("Successfully signed in!");
        } else if (error.code === "auth/popup-closed-by-user") {
            toast.error("Google popup was closed, please try again now.");
            throw error;
        } else {
            toast.error("Error signing in with Google.");
            console.error("Error signing in with Google: ", error);
            throw error;
        }
    }
};
