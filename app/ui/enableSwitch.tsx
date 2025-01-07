"use client";

import { useState } from "react";

/**
 * Switch for users to click and toggle the enabled status of the stat module.
 *
 * @param props Component props
 * @returns Enable switch
 */
export const EnableSwitch = ({
    onEnableClick,
    backgroundColor,
}: {
    onEnableClick: () => void;
    backgroundColor: string;
}) => {
    const [isClicked, setIsClicked] = useState(true);

    /**
     * Toggles the local isClicked state variable and calls the function passed down as a prop to
     * handle disabling the stat module.
     */
    function handleClick() {
        setIsClicked(!isClicked);
        onEnableClick();
    }

    return (
        <label className="mr-1 inline-flex cursor-pointer items-center">
            <input
                type="checkbox"
                value=""
                onChange={handleClick}
                className="peer sr-only"
                checked={isClicked}
            />
            <div
                className="relative h-6 w-11 rounded-full transition-colors duration-300 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full"
                style={{
                    backgroundColor: isClicked ? backgroundColor : "gray",
                }}
            ></div>
        </label>
    );
};
