"use client";

import Link from "next/link";
import { FaBars } from "react-icons/fa6";
import ThemeButton from "./themeButton";
import NavAccountButton from "./navAccountButton";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { NavMenu } from "./navMenu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavSheet } from "./navSheet";

/**
 * The site navigation bar and app title located along the top of the screen.
 *
 * @returns navigation bar
 */
export default function TopNav() {
    return (
        <div className="fixed left-0 top-0 z-50 w-full bg-rankle">
            <div className="flex justify-between px-4 py-2 lg:px-8">
                <div className="flex gap-2">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link href="/" className="relative">
                                <h1 className="peer text-4xl font-bold text-black">Rankle</h1>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent>Home</TooltipContent>
                    </Tooltip>
                    <div className="hidden gap-2 sm:flex">
                        <NavMenu />
                        <ThemeButton />
                    </div>
                </div>

                <div className="flex items-center justify-end gap-2">
                    <div className="flex sm:hidden">
                        <ThemeButton />
                    </div>
                    <Sheet>
                        <SheetTrigger className="sm:hidden">
                            <FaBars className="size-7 text-black" />
                        </SheetTrigger>
                        <SheetContent side="top" className="flex flex-col gap-8">
                            <NavSheet />
                        </SheetContent>
                    </Sheet>

                    <div className="hidden sm:flex sm:gap-2">
                        <NavAccountButton />
                    </div>
                </div>
            </div>
        </div>
    );
}
