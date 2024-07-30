import { useState } from "react";

export const InputModule = ({ valueIndex, queryText, buttonLabels, buttonValues, onInputClick, themeColor, isEnabled}) => {
    const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);
    const buttons = [];

    // Create each button with ascending or descending numbers.
    for (let index = 0; index < buttonLabels.length; ++index) {
        let value = buttonValues[index];
        buttons.push(
            <button
                className="statModuleButton"
                key={index}
                value={value}
                style={{ backgroundColor: selectedButtonIndex === index ? themeColor : "white" , borderColor: isEnabled ? themeColor : "grey"}}
                onClick={() => handleClick(index, valueIndex, value)}
            >
                {buttonLabels[index]}
            </button>
        );
    }

    function handleClick(index, valueIndex, value) {
        setSelectedButtonIndex(index);
        onInputClick(valueIndex, value);
    }

    return (
        <>
            <label>{queryText}</label>
            <div className="statModuleButtonContainer">
                {buttons}
            </div>
        </>
    )
}