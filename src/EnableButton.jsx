import { useState } from "react";

export const EnableButton = ({ onEnableClick, backgroundColor }) => {
    const [isClicked, setIsClicked] = useState(true);

    function handleClick() {
        const enabled = isClicked === true ? false : true
        setIsClicked(enabled);
        onEnableClick(enabled);
    }

    return (
        <button
            className="enablebutton"
            style={{ backgroundColor: isClicked ? backgroundColor : "white", color: "black" }}
            onClick={() => handleClick()}
        >
            Enable
        </button>
    )
}