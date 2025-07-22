import { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

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
        <Tooltip>
            <TooltipTrigger asChild>
                <label className="flex cursor-pointer justify-center">
                    <input type="checkbox" onChange={handleClick} checked={isClicked} />
                    <div className="ml-1">Hard Mode</div>
                </label>
            </TooltipTrigger>
            <TooltipContent>×{hardModeMultiplier}</TooltipContent>
        </Tooltip>
    );
};
