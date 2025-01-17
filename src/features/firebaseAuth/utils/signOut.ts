import { signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "@/config/firebase";

export const signOut = async () => {
    return await firebaseSignOut(auth);
};
