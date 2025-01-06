"use client";

import {
    ComputerDesktopIcon,
    MoonIcon,
    SunIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeButton = () => {
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme, setTheme } = useTheme();

    useEffect(() => setMounted(true), []);

    return mounted ? (
        <button
            type="button"
            className="*:border-2 *:border-black *:text-black *:hover:transition-colors"
            onClick={() => {
                setTheme(resolvedTheme === "dark" ? "light" : "dark");
            }}
        >
            {resolvedTheme === "dark" ? (
                <SunIcon className="w-7 rounded-full p-1 md:w-9 hover:bg-amber-300" />
            ) : (
                <MoonIcon className="w-7 rounded-full p-1 md:w-9 hover:bg-amber-500" />
            )}
        </button>
    ) : (
        <ComputerDesktopIcon className="h-7 w-7 rounded-full border-2 border-gray-500 p-1 text-gray-500 md:h-9 md:w-9" />
    );
};

export default ThemeButton;
