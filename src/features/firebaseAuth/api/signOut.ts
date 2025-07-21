import { signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "@/config/firebase";
import { toast } from "sonner";

export const signOut = async () => {
    await firebaseSignOut(auth);
    toast("Farewell, Rankler!");
    return;
};
