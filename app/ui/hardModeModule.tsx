import { useState } from "react";
import { HoverTooltip } from "./hoverTooltip";

/**
 * A module with a checkbox for users to toggle hard mode in a stat module, multiplying each input
 * module's selected score by the given amount.
 * 
 * @param props Component props
 * @returns Hard mode module
 */
export const HardModeModule = ({
    hardModeMultiplier,
    onHardModeClick,
}: {
    hardModeMultiplier: number;
    onHardModeClick: () => void;
}) => {
    const [isClicked, setIsClicked] = useState(false);


    /**
     * Toggles the local isClicked state variable and calls the function passed down as a prop to
     * handle unchecking hard mode.
     */
    function handleClick() {
        setIsClicked(!isClicked);
        onHardModeClick();
    }

    return (
        <div className="relative">
            <label className="peer flex justify-center cursor-pointer">
                <input
                    type="checkbox"
                    value=""
                    onChange={handleClick}
                    className=""
                    checked={isClicked}
                />
                <div className="ml-1">Hard Mode</div>
            </label>
            <HoverTooltip tooltipText={`×${hardModeMultiplier}`} />
        </div>
    );
};
