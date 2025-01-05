"use client";

import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useTheme } from "next-themes";

const ThemeButton = () => {
    const { resolvedTheme, setTheme } = useTheme();

    return (
        <button
            type="button"
            onClick={() => {
                setTheme(resolvedTheme === "dark" ? "light" : "dark");
            }}
        >
            {resolvedTheme === "dark" ? (
                <SunIcon className="m-2 w-5 rounded-full border-2 border-white p-1 text-white md:w-8" />
            ) : (
                <MoonIcon className="m-2 w-5 rounded-full border-2 border-black p-1 text-black md:w-8" />
            )}
        </button>
    );
};

export default ThemeButton;
