"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/features/firebaseAuth/hooks/useAuth";
import { signOut } from "@/features/firebaseAuth/api/signOut";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Account = () => {
    const { currentUser } = useAuth();

    const router = useRouter();

    return (
        <div className="mt-6 flex w-full max-w-md flex-col gap-4">
            <Card>
                <CardHeader>
                    <CardTitle>Rankle Profile</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col">
                    <div className="flex justify-between">
                        <span className="font-semibold">Name</span>
                        <span>{currentUser?.providerData[0].displayName ?? "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Email</span>
                        <span>{currentUser ? currentUser.email : "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Account type</span>
                        <span>{currentUser?.providerData[0].providerId}</span>
                    </div>
                </CardContent>
                <CardFooter className="flex w-full justify-end gap-2">
                    <Button
                        className="bg-rankle text-black shadow hover:bg-rankle-hover"
                        onClick={async () => {
                            router.push("/login");
                            await signOut();
                        }}
                    >
                        Sign Out
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Account;
