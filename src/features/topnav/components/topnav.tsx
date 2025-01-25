"use client";

import Link from "next/link";
import { HoverTooltip } from "@/components/hoverTooltip";
import { HiOutlinePlus, HiOutlineSquares2X2 } from "react-icons/hi2";
import ThemeButton from "./themeButton";
import AccountButton from "./accountButton";
import { LinkData } from "../types/links";
import { FaBars } from "react-icons/fa6";

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
        <>
            <div className="fixed left-0 top-0 z-50 flex w-full items-center border-b-2 border-black bg-amber-300 px-4 py-2 lg:px-8 lg:py-4 dark:border-white dark:bg-amber-500">
                <nav className="flex flex-1">
                    <ThemeButton />
                </nav>

                <Link className="relative" href={"/"}>
                    <h1 className="peer text-4xl font-bold text-black">RANKLE</h1>
                    <HoverTooltip tooltipText="Home" delay="1000" />
                </Link>

                <nav className="flex flex-1 items-center justify-end gap-2">
                    <button className="sm:hidden">
                        <FaBars className="h-6 w-6" />
                    </button>

                    <div className="hidden justify-end sm:flex sm:gap-2">
                        {rightLinks.map((link) => {
                            const LinkIcon = link.icon;
                            return (
                                <Link
                                    key={link.name}
                                    className="relative aspect-square h-fit rounded-lg border-2 border-black text-black transition-colors hover:bg-amber-500 hover:text-white dark:hover:bg-amber-300 dark:hover:text-black"
                                    href={link.href}
                                >
                                    <LinkIcon className="peer h-8 w-8 dark:text-white" />
                                    <HoverTooltip key={link.name} tooltipText={link.name} />
                                </Link>
                            );
                        })}
                        <AccountButton />
                    </div>
                </nav>
            </div>
            <div>hallooo</div>
        </>
    );
}
