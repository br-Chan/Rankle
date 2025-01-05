"use client";

import {
    ComputerDesktopIcon,
    MoonIcon,
    SunIcon,
} from "@heroicons/react/24/solid";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeButton = () => {
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme, setTheme } = useTheme();

    useEffect(() => setMounted(true), []);

    return mounted ? (
        <button
            type="button"
            className="*:hover:bg-amber-500 *:hover:transition-colors"
            onClick={() => {
                setTheme(resolvedTheme === "dark" ? "light" : "dark");
            }}
        >
            {resolvedTheme === "dark" ? (
                <SunIcon className="w-7 rounded-full border-2 border-white p-1 text-white md:w-9" />
            ) : (
                <MoonIcon className="w-7 rounded-full border-2 border-black p-1 text-black md:w-9" />
            )}
        </button>
    ) : (
        <ComputerDesktopIcon className="h-7 w-7 rounded-full border-2 border-gray-500 p-1 text-gray-500 md:h-9 md:w-9" />
    );
};

export default ThemeButton;
