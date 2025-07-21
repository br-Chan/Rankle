import { User, EmailAuthProvider, linkWithCredential } from "firebase/auth";
import { toast } from "sonner";

export const registerAndLinkWithEmail = async (
    initialUser: User,
    email: string,
    password: string
) => {
    try {
        const credential = EmailAuthProvider.credential(email, password);
        await linkWithCredential(initialUser, credential);
        toast.success("Successfully signed up!");
    } catch (error) {
        toast.error("Error when registering with email.");
        console.error("Error registering with email: ", error);
        throw error;
    }
};
