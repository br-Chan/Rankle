"use client";

import Link from "next/link";
import { HoverTooltip } from "@/components/hoverTooltip";
import { useAuth } from "@/features/firebaseAuth/hooks/useAuth";
import {
    PlusIcon,
    Squares2X2Icon,
    ArrowRightEndOnRectangleIcon,
    UserIcon,
} from "@heroicons/react/24/outline";
import ThemeButton from "./themeButton";
import AccountButton from "./accountButton";

const leftLinks = [];

const rightLinks = [
    { name: "Add game", href: "/games/create", icon: PlusIcon },
    { name: "All games", href: "/games", icon: Squares2X2Icon },
];

/**
 * The site navigation bar and app title located along the top of the screen.
 *
 * @returns navigation bar
 */
export default function TopNav() {
    const { currentUser } = useAuth();

    return (
        <div className="flex w-full items-center justify-between px-5">
            <div className="flex flex-1">
                <ThemeButton />
            </div>

            <Link className="relative" href={"/"}>
                <h1 className="peer text-2xl font-bold text-black md:text-4xl">RANKLE</h1>
                <HoverTooltip tooltipText="Home" delay="1000" />
            </Link>

            <div className="flex flex-1 justify-end">
                {rightLinks.map((link) => {
                    const LinkIcon = link.icon;
                    return (
                        <Link
                            key={link.name}
                            className="relative mx-1 rounded-lg border-2 border-black text-black transition-colors hover:bg-amber-500 hover:text-white dark:hover:bg-amber-300 dark:hover:text-black"
                            href={link.href}
                        >
                            <LinkIcon className="peer w-6 md:w-8 dark:text-white" />
                            <HoverTooltip key={link.name} tooltipText={link.name} />
                        </Link>
                    );
                })}
                <AccountButton />
            </div>
        </div>
    );
}
