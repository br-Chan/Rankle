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
            className="*:border-2 *:border-black *:text-black *:hover:transition-colors rounded-full"
            onClick={() => {
                setTheme(resolvedTheme === "dark" ? "light" : "dark");
            }}
        >
            {resolvedTheme === "dark" ? (
                <HiOutlineSun className="h-9 w-9 rounded-full p-1 hover:bg-amber-300" />
            ) : (
                <HiOutlineMoon className="h-9 w-9 rounded-full p-1 hover:bg-amber-500" />
            )}
        </button>
    ) : (
        <HiOutlineComputerDesktop className="h-9 w-9 rounded-full border-2 border-gray-500 p-1 text-gray-500" />
    );
};

export default ThemeButton;
