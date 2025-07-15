"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/features/firebaseAuth/hooks/useAuth";
import { signOut } from "@/features/firebaseAuth/api/signOut";

const Account = () => {
    const { currentUser } = useAuth();

    const router = useRouter();

    return (
        <>
            <h1 className="gap-2 text-center text-2xl font-black">ACCOUNT</h1>
            <p>Manage your account details and sign out!</p>

            <div className="mt-6 flex w-full flex-col gap-4 md:w-[576px]">
                <span className="rounded-xl bg-white p-2 text-center dark:bg-zinc-900">
                    Name: {currentUser?.providerData[0].displayName ?? "none"}
                </span>
                <span className="rounded-xl bg-white p-2 text-center dark:bg-zinc-900">
                    Email: {currentUser ? currentUser.email : "none"}
                </span>
                <span className="rounded-xl bg-white p-2 text-center dark:bg-zinc-900">
                    Account type: {currentUser?.providerData[0].providerId}
                </span>
                <button
                    className="transition-colours bg-rankle rounded-full p-4 font-bold duration-300"
                    onClick={async () => {
                        await signOut();
                        router.push("/login");
                    }}
                >
                    Sign Out
                </button>
            </div>
        </>
    );
};

export default Account;
