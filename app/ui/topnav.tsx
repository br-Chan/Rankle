"use client";

import Link from "next/link";
import { HoverTooltip } from "./hoverTooltip";

const leftLinks = [];

const rightLinks = [
    { name: "All games", href: "/games" },
    { name: "Create game", href: "/games/create" },
    // {name:"", href:"",},
    // {name:"", href:"",},
];

/**
 * The site navigation bar and app title located along the top of the screen.
 *
 * @returns navigation bar
 */
export default function TopNav() {
    return (
        <div className="flex justify-between items-center w-full">
            <div className="w-96">
                <button>hihi</button>
            </div>
            <h1 className="text-4xl text-black font-bold">RANKLE</h1>
            <div className="flex justify-end w-96">
                {rightLinks.map((link) => {
                    return (
                        <Link
                            key={link.name}
                            className="relative mx-1 border-2 border-black bg-white rounded-md hover:bg-amber-200"
                            href={link.href}
                        >
                            <p className="peer">{link.name}</p>
                            <HoverTooltip key={`${link.name}`} tooltipText={link.name} />
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
