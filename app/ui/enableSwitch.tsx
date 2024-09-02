"use client";

import { useState } from "react";

export const EnableSwitch = ({
    onEnableClick,
    backgroundColor,
}: {
    onEnableClick: () => void,
    backgroundColor: string,
}) => {
    const [isClicked, setIsClicked] = useState(true);

    function handleClick() {
        setIsClicked(!isClicked);
        onEnableClick();
    }

    return (
        <label className="mr-1 inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                value=""
                onChange={handleClick}
                className="sr-only peer"
                checked={isClicked}
            />
            <div
                className="relative w-11 h-6 transition-colors duration-300 rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"
                style={{
                    backgroundColor: isClicked ? backgroundColor : "gray",
                }}
            ></div>
        </label>
    );
};