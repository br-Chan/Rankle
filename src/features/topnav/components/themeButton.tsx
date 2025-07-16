"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { HiComputerDesktop, HiMoon, HiSun } from "react-icons/hi2";

const ThemeButton = () => {
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme, setTheme } = useTheme();

    useEffect(() => setMounted(true), []);

    return mounted ? (
        <button
            type="button"
            className="self-center rounded-md *:bg-rankle *:text-black *:hover:transition-colors"
            onClick={() => {
                setTheme(resolvedTheme === "dark" ? "light" : "dark");
            }}
        >
            {resolvedTheme === "dark" ? (
                <HiSun className="size-8 rounded-md p-1 hover:bg-rankle-hover sm:size-9" />
            ) : (
                <HiMoon className="size-8 rounded-md p-1 hover:bg-rankle-hover sm:size-9" />
            )}
        </button>
    ) : (
        <a className="self-center rounded-full" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
            <HiComputerDesktop className="size-8 rounded-md bg-rankle p-1 text-black hover:bg-rankle-hover sm:size-9" />
        </a>
    );
};

export default ThemeButton;
