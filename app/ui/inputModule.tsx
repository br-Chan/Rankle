"use client"

import { useState } from "react";

export type InputModuleData = {
    queryText: string;
    buttonLabels: (number | string)[];
    buttonValues: number[];
}

export const InputModule = ({ data, themeColor }: { data: InputModuleData, themeColor: string }) => {
    const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);
    const [enabled, setEnabled] = useState(true); // not implemented yet, always will be true
    const buttons = [];

    const handleClick = (index: number) => { // valueIndex, value
        setSelectedButtonIndex(index);
        // onInputClick(valueIndex, value);
    }

    // Create each button with ascending or descending numbers.
    for (let index = 0; index < data.buttonLabels.length; ++index) {
        let value = data.buttonValues[index];
        buttons.push(
            <button
                className="basis-7 py-2 px-2 text-black font-semibold border-2 border-black rounded-lg"
                key={index}
                value={value}
                style={{ backgroundColor: selectedButtonIndex === index ? (enabled ? themeColor : "lightgrey") : "white" }}
                onClick={() => handleClick(index)} //, valueIndex, value
            >
                {data.buttonLabels[index]}
            </button>
        );
    }

    return (
        <>
            <label>{data.queryText}</label>
            <div className="grid grid-cols-3 gap-1">
                {buttons}
            </div>
        </>
    )

}