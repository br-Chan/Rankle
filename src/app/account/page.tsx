"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/features/firebaseAuth/hooks/useAuth";
import { signOut } from "@/features/firebaseAuth/utils/signOut";

const Account = () => {
    const { currentUser } = useAuth();

    const router = useRouter();

    return (
        <main className="flex w-[288px] flex-col justify-center text-center md:w-[576px]">
            <h1 className="gap-2 text-center text-2xl font-black">ACCOUNT</h1>
            <p>Manage your account details and sign out!</p>
            <div className="mt-10 flex flex-col gap-5">
                <span className="rounded-xl bg-white p-2 dark:bg-zinc-900">
                    Email: {currentUser ? currentUser.email : ""}
                </span>
                <button
                    className="transition-colours rounded-full bg-amber-300 p-4 font-bold text-black duration-300 hover:bg-amber-500 hover:text-white"
                    onClick={async () => {
                        await signOut();
                        router.push("/");
                    }}
                >
                    SIGN OUT
                </button>
            </div>
        </main>
    );
};

export default Account;
