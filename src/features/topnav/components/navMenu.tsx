"use client";

import * as React from "react";
import Link from "next/link";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { FaGithub, FaQuestion } from "react-icons/fa6";
import { HiOutlinePlus, HiOutlineSquares2X2 } from "react-icons/hi2";

export const NavMenu = () => {
    return (
        <NavigationMenu viewport={false}>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>
                        <Link href="/">Home</Link>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[200px] gap-4">
                            <li>
                                <NavigationMenuLink asChild>
                                    <Link className="font-medium" href="/">
                                        My Games
                                    </Link>
                                </NavigationMenuLink>
                                <NavigationMenuLink asChild>
                                    <Link href="/scores">
                                        <div className="font-medium">My Scores</div>
                                        <div className="text-muted-foreground">
                                            View all your saved scores.
                                        </div>
                                    </Link>
                                </NavigationMenuLink>
                            </li>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuTrigger>Games</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[300px] gap-4">
                            <li>
                                <NavigationMenuLink asChild>
                                    <Link href="/games/create">
                                        <div>
                                            <div className="grid grid-cols-[.2fr_1fr] items-center justify-center">
                                                <HiOutlinePlus className="row-span-2 size-8" />
                                                <div className="font-medium">Create</div>
                                                <div className="text-muted-foreground">
                                                    Add a game module to Rankle.
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </NavigationMenuLink>
                                <NavigationMenuLink asChild>
                                    <Link href="/games">
                                        <div className="grid grid-cols-[.2fr_1fr] items-center justify-center">
                                            <HiOutlineSquares2X2 className="row-span-2 size-8" />
                                            <div className="font-medium">All games</div>
                                            <div className="text-muted-foreground">
                                                Browse games that other Ranklers have added.
                                            </div>
                                        </div>
                                    </Link>
                                </NavigationMenuLink>
                            </li>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuTrigger>About</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[300px] gap-4">
                            <li>
                                <NavigationMenuLink asChild>
                                    <Link href="/about">
                                        <div className="grid grid-cols-[.2fr_1fr] items-center justify-center">
                                            <FaQuestion className="row-span-2 size-8" />
                                            <div className="font-medium">About Rankle</div>
                                            <div className="text-muted-foreground">
                                                What is this?
                                            </div>
                                        </div>
                                    </Link>
                                </NavigationMenuLink>
                                <NavigationMenuLink asChild>
                                    <a
                                        className="flex"
                                        href="https://github.com/br-Chan/Rankle"
                                        rel="noopener"
                                        target="_blank"
                                    >
                                        <div className="grid grid-cols-[.2fr_1fr] items-center justify-center">
                                            <FaGithub className="row-span-2 size-8" />
                                            <div className="font-medium">GitHub</div>
                                            <div className="text-muted-foreground">
                                                Take a look at Rankle&apos;s code.
                                            </div>
                                        </div>
                                    </a>
                                </NavigationMenuLink>
                            </li>
                            <span className="text-center text-xs text-muted-foreground">
                                Made by br-Chan
                            </span>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
};
