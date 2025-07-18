import { User, EmailAuthProvider, linkWithCredential } from "firebase/auth";

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
