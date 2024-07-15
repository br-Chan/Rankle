import { useState } from "react";

export const ButtonModule = ({ queryText, numOfButtons, descending, themeColor }) => {
    const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);
    const buttons = [];

    // Clear the button text string.
    let buttonText = "";

    // Create each button with ascending or descending numbers.
    for (let index = 0; index < numOfButtons + 1; ++index) {
        if (index === numOfButtons) {
            buttonText = "X";
        } else if (descending === true) {
            buttonText = numOfButtons - index;
        } else {
            buttonText = index + 1;
        }

        buttons.push(
            <button
                className="statModuleButton"
                key={index}
                style={{ backgroundColor: selectedButtonIndex === index ? themeColor : "white" }}
                onClick={() => handleClick(index)}
            >
                {buttonText}
            </button>
        );
    }

    function handleClick(index) {
        setSelectedButtonIndex(index);
    }

    return (
        <>
            <label>{queryText}<br /></label>
            <div className="statModuleButtonContainer">
                {buttons}
            </div>
        </>
    )
}