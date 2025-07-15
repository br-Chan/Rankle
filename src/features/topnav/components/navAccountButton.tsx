"use client";

import Link from "next/link";
import { HiOutlineArrowRightEndOnRectangle, HiOutlineUser } from "react-icons/hi2";
import { useAuth } from "@/features/firebaseAuth/hooks/useAuth";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const NavAccountButton = () => {
    const { currentUser } = useAuth();

    return (
        <Tooltip>
            {!currentUser || currentUser.isAnonymous ? (
                <>
                    <TooltipTrigger asChild>
                        <Link
                            className="rounded-full border-2 border-black text-black transition-colors hover:bg-amber-500 hover:text-white dark:hover:bg-amber-300 dark:hover:text-black"
                            href="/login"
                        >
                            <HiOutlineArrowRightEndOnRectangle className="size-8 p-1" />
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent>Login</TooltipContent>
                </>
            ) : (
                <>
                    <TooltipTrigger asChild>
                        <Link
                            className="rounded-lg border-2 border-black text-black transition-colors hover:bg-amber-500 hover:text-white dark:hover:bg-amber-300 dark:hover:text-black"
                            href="/account"
                        >
                            <HiOutlineUser className="h-8 w-8 dark:text-white" />
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent>Account</TooltipContent>
                </>
            )}
        </Tooltip>
    );
};

export default NavAccountButton;
