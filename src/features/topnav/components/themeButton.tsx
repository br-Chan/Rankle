"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { HiOutlineComputerDesktop, HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";

const ThemeButton = () => {
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme, setTheme } = useTheme();

    useEffect(() => setMounted(true), []);

    return mounted ? (
        <button
            type="button"
            className="rounded-full *:border-2 *:border-black *:bg-rankle *:text-black *:hover:transition-colors"
            onClick={() => {
                setTheme(resolvedTheme === "dark" ? "light" : "dark");
            }}
        >
            {resolvedTheme === "dark" ? (
                <HiOutlineSun className="size-9 rounded-full p-1 hover:bg-rankle-hover" />
            ) : (
                <HiOutlineMoon className="size-9 rounded-full p-1 hover:bg-rankle-hover" />
            )}
        </button>
    ) : (
        <a className="self-center rounded-full" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
            <HiOutlineComputerDesktop className="size-9 rounded-full border-2 border-black bg-rankle p-1 text-black" />
        </a>
    );
};

export default ThemeButton;
