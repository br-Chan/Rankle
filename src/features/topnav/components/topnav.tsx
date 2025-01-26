"use client";

import Link from "next/link";
import { useState } from "react";
import { HiOutlinePlus, HiOutlineSquares2X2 } from "react-icons/hi2";
import { FaBars } from "react-icons/fa6";
import { HoverTooltip } from "@/components/hoverTooltip";
import ThemeButton from "./themeButton";
import NavAccountButton from "./navAccountButton";
import ListAccountButton from "./listAccountButton";
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
    const [openHamburger, setOpenHamburger] = useState(false);

    return (
        <div className="fixed left-0 top-0 z-50 w-full bg-amber-300 dark:bg-amber-500">
            <div className="flex items-center border-b-2 border-black px-4 py-2 lg:px-8 lg:py-4 dark:border-white">
                <nav className="flex flex-1">
                    <ThemeButton />
                </nav>

                <Link
                    onClick={() => {
                        setOpenHamburger(false);
                    }}
                    href={"/"}
                    className="relative"
                >
                    <h1 className="peer text-4xl font-bold text-black">RANKLE</h1>
                    <HoverTooltip tooltipText="Home" delay="1000" />
                </Link>

                <nav className="flex flex-1 items-center justify-end gap-2">
                    <button className="sm:hidden">
                        <FaBars
                            onClick={() => setOpenHamburger(!openHamburger)}
                            className={`${openHamburger ? "text-amber-50" : "text-black"} h-6 w-6`}
                        />
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
                        <NavAccountButton />
                    </div>
                </nav>
            </div>
            <div
                className={`${openHamburger ? "flex" : "hidden"} flex-col items-center border-b-2 border-black sm:hidden dark:border-white`}
            >
                <ListAccountButton onClick={() => setOpenHamburger(false)} />
                {rightLinks.map((link) => {
                    const LinkIcon = link.icon;
                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setOpenHamburger(false)}
                            className="flex w-full items-center justify-center transition-bg-border hover:bg-amber-500 hover:text-white dark:text-white dark:hover:bg-amber-300 dark:hover:text-black"
                        >
                            <LinkIcon className="h-7 w-7" /> {link.name}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
