import { useState } from "react";

export const EnableButton = ({ enabled }) => {
    const [isClicked, setIsClicked] = useState(true);

    function handleClick() {
        const toggledState = isClicked === true ? false : true;
        isClicked = setIsClicked(toggledState);
        enabled = toggledState;
    }

    return (
        <button
            className="enablebutton"
            style={{ backgroundColor: isClicked ? "gold" : "white" }}
            onClick={() => handleClick()}
        >
            Enable
        </button>
    )
}