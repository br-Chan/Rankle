import { useState } from "react";

export const HardModeModule = ({ onHardModeClick }: { onHardModeClick: () => void }) => {
    const [isClicked, setIsClicked] = useState(false);

    // Toggles the local isClicked state variable and calls the function passed down as a prop to
    // handle unchecking hard mode.
    function handleClick() {
        setIsClicked(!isClicked);
        onHardModeClick();
    }

    return (
        <label className="flex justify-center cursor-pointer">
            <input
                type="checkbox"
                value=""
                onChange={handleClick}
                className=""
                checked={isClicked}
            />
            <div className="ml-1">Hard Mode</div>
        </label>
    );
};
