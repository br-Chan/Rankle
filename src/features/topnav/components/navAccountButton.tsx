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
                            className="rounded-md bg-rankle text-black hover:bg-amber-500 hover:bg-rankle-hover hover:transition-colors"
                            href="/login"
                        >
                            <HiOutlineArrowRightEndOnRectangle className="size-9 rounded-md p-1" />
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent>Login</TooltipContent>
                </>
            ) : (
                <>
                    <TooltipTrigger asChild>
                        <Link
                            className="rounded-md bg-rankle text-black hover:bg-amber-500 hover:bg-rankle-hover hover:transition-colors"
                            href="/account"
                        >
                            <HiOutlineUser className="size-9 rounded-md p-1" />
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent>Account</TooltipContent>
                </>
            )}
        </Tooltip>
    );
};

export default NavAccountButton;
