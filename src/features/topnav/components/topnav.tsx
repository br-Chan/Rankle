"use client";

import Link from "next/link";
import { HoverTooltip } from "@/components/hoverTooltip";
import { HiOutlinePlus, HiOutlineSquares2X2 } from "react-icons/hi2";
import ThemeButton from "./themeButton";
import AccountButton from "./accountButton";
import { LinkData } from "../types/links";

const leftLinks: LinkData[] = [];

const rightLinks: LinkData[] = [
    { name: "Add game", href: "/games/create", icon: HiOutlinePlus },
    { name: "All games", href: "/games", icon: HiOutlineSquares2X2 },
];

/**
 * The site navigation bar and app title located along the top of the screen.
 *
 * @returns navigation bar
 */
export default function TopNav() {
    return (
        <div className="fixed left-0 top-0 z-50 flex w-full justify-center border-b-2 border-black bg-amber-300 p-2 lg:p-4 dark:border-white dark:bg-amber-500">
            <div className="flex w-full items-center justify-between px-5">
                <div className="flex flex-1">
                    <ThemeButton />
                </div>

                <Link className="relative" href={"/"}>
                    <h1 className="peer font-bold text-black text-4xl">RANKLE</h1>
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
                                <LinkIcon className="peer h-8 w-8 dark:text-white" />
                                <HoverTooltip key={link.name} tooltipText={link.name} />
                            </Link>
                        );
                    })}
                    <AccountButton />
                </div>
            </div>
        </div>
    );
}
