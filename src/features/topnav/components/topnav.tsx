"use client";

import Link from "next/link";
import { useState } from "react";
import { HiOutlinePlus, HiOutlineSquares2X2 } from "react-icons/hi2";
import { FaBars } from "react-icons/fa6";
import ThemeButton from "./themeButton";
import NavAccountButton from "./navAccountButton";
import ListAccountButton from "./listAccountButton";
import { LinkData } from "../types/links";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { NavMenu } from "./navMenu";

/**
 * The site navigation bar and app title located along the top of the screen.
 *
 * @returns navigation bar
 */
export default function TopNav() {
    const [openHamburger, setOpenHamburger] = useState(false);

    return (
        <div className="fixed left-0 top-0 z-50 w-full bg-rankle">
            <div className="flex justify-between px-4 py-2 lg:px-8">
                <div className="flex gap-2">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                onClick={() => {
                                    setOpenHamburger(false);
                                }}
                                href="/"
                                className="relative"
                            >
                                <h1 className="peer text-4xl font-bold text-black">Rankle</h1>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent>Home</TooltipContent>
                    </Tooltip>
                    <NavMenu />
                    <ThemeButton />
                </div>

                <div className="flex items-center justify-end gap-2">
                    <button className="sm:hidden">
                        <FaBars
                            onClick={() => setOpenHamburger(!openHamburger)}
                            className={`${openHamburger ? "text-amber-50" : "text-black"} h-6 w-6`}
                        />
                    </button>

                    <div className="hidden justify-end sm:flex sm:gap-2">
                        <NavAccountButton />
                    </div>
                </div>
            </div>
            <div
                className={`${openHamburger ? "flex" : "hidden"} flex-col items-center border-b-2 border-black sm:hidden dark:border-white`}
            >
                <ListAccountButton onClick={() => setOpenHamburger(false)} />
                TODO: Must implement links!
            </div>
        </div>
    );
}
