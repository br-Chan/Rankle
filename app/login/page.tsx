"use client";

import {
    AuthErrorCodes,
    getAdditionalUserInfo,
    getAuth,
    GoogleAuthProvider,
    linkWithCredential,
    linkWithPopup,
    signInWithCredential,
    signInWithPopup,
    signOut,
    UserCredential,
} from "firebase/auth";
import { useAuth } from "../hooks/useAuth";

/**
 * Page where users can create their own games.
 *
 * @returns Create form page
 */
export default function Home() {
    const { user } = useAuth();
    const auth = getAuth();

    const handleGoogleSignIn = async () => {
        try {
            const provider = new GoogleAuthProvider();

            await linkWithPopup(user!, provider);

            // const result = await signInWithPopup(auth, provider);
            // const isNewGoogleUser = getAdditionalUserInfo(result)?.isNewUser;
            // console.log("Signed in with Google.");

            // if (isNewGoogleUser && user) {
            //     console.log(
            //         "This user just registered with Google. Linking with anonymous user..."
            //     );
            //     const credential =
            //         GoogleAuthProvider.credentialFromResult(result);
            //     //  provider.credentialFromResult(auth, result);
            //     // const token = credential.accessToken;

            //     linkWithCredential(user, credential!)
            //         .then((usercred) => {
            //             const user = usercred.user;
            //             console.log(
            //                 "Anonymous account successfully upgraded",
            //                 user
            //             );
            //         })
            //         .catch((error) => {
            //             console.log("Error upgrading anonymous account", error);
            //         });
            // }
        } catch (error: any) {
            if (error.code.includes("auth/credential-already-in-use")) {
                //Now we use OAuthProvider.credentialFromError
                const credential =
                    GoogleAuthProvider.credentialFromError(error);
                signInWithCredential(auth, credential!);
            } else {
                console.error("Error signing in to Google with popup: ", error);
            }
        }
    };

    return (
        <main className="flex w-[288px] flex-col justify-center text-center md:w-[576px]">
            <h1 className="gap-2 text-center text-2xl font-black">LOGIN</h1>
            <p>Save all your games for easy access!</p>
            <button
                className="rounded-full bg-white p-4 hover:bg-zinc-100"
                onClick={() => handleGoogleSignIn()}
            >
                Sign in with Google
            </button>
            <button
                className="rounded-full bg-white p-4 hover:bg-zinc-100"
                onClick={() => {
                    signOut(auth);
                    console.log("Signing out...");
                }}
            >
                Sign out!
            </button>
        </main>
    );
}
