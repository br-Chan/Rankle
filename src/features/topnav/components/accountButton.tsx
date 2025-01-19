"use client";

import Link from "next/link";
import { HoverTooltip } from "@/components/hoverTooltip";
import { useAuth } from "@/features/firebaseAuth/hooks/useAuth";
import { HiOutlineArrowRightEndOnRectangle, HiOutlineUser } from "react-icons/hi2";

const AccountButton = () => {
    const { currentUser } = useAuth();

    return !currentUser || currentUser.isAnonymous ? (
        <Link
            className="relative mx-1 rounded-lg border-2 border-black text-black transition-colors hover:bg-amber-500 hover:text-white dark:hover:bg-amber-300 dark:hover:text-black"
            href="/login"
        >
            <HiOutlineArrowRightEndOnRectangle className="peer h-8 w-8 dark:text-white" />
            <HoverTooltip tooltipText="Login" />
        </Link>
    ) : (
        <Link
            className="relative mx-1 rounded-lg border-2 border-black text-black transition-colors hover:bg-amber-500 hover:text-white dark:hover:bg-amber-300 dark:hover:text-black"
            href="/account"
        >
            <HiOutlineUser className="peer h-8 w-8 dark:text-white" />
            <HoverTooltip tooltipText="Account" />
        </Link>
    );
};

export default AccountButton;
