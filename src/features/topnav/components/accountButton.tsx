"use client";

import Link from "next/link";
import { HoverTooltip } from "@/components/hoverTooltip";
import { useAuth } from "@/features/firebaseAuth/hooks/useAuth";
import { ArrowRightEndOnRectangleIcon, UserIcon } from "@heroicons/react/24/outline";

const AccountButton = () => {
    const { currentUser } = useAuth();

    return !currentUser || currentUser.isAnonymous ? (
        <Link
            className="relative mx-1 rounded-lg border-2 border-black text-black transition-colors hover:bg-amber-500 hover:text-white dark:hover:bg-amber-300 dark:hover:text-black"
            href="/login"
        >
            <ArrowRightEndOnRectangleIcon className="peer w-6 md:w-8 dark:text-white" />
            <HoverTooltip tooltipText="Login" />
        </Link>
    ) : (
        <Link
            className="relative mx-1 rounded-lg border-2 border-black text-black transition-colors hover:bg-amber-500 hover:text-white dark:hover:bg-amber-300 dark:hover:text-black"
            href="/account"
        >
            <UserIcon className="peer w-6 md:w-8 dark:text-white" />
            <HoverTooltip tooltipText="Account" />
        </Link>
    );
};

export default AccountButton;
