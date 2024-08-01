import { useState, useEffect } from "react";

export function InputModule({ valueIndex, queryText, buttonLabels, buttonValues, onInputClick, themeColor, isEnabled }){
    const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);
    const [enabled, setEnabled] = useState(true);
    const buttons = [];

    // Create each button with ascending or descending numbers.
    for (let index = 0; index < buttonLabels.length; ++index) {
        let value = buttonValues[index];
        buttons.push(
            <button
                className="statModuleButton"
                key={index}
                value={value}
                style={{ backgroundColor: selectedButtonIndex === index ? (enabled ? themeColor : "lightgrey") : "white"}}
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

    useEffect(() => {
        setEnabled(isEnabled)
    }, [isEnabled]);

    return (
        <>
            <label>{queryText}</label>
            <div className="statModuleButtonContainer">
                {buttons}
            </div>
        </>
    )
}