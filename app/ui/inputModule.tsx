"use client";

import { useState } from "react";

export type InputModuleData = {
    scoreIndex: number;
    queryText: string;
    buttonLabels: (number | string)[];
    buttonScores: number[];
}

export const InputModule = ({
    data,
    themeColor,
    onInputClick
}: {
    data: InputModuleData,
    themeColor: string,
    onInputClick: (scoreIndex: number, score: number) => void
}) => {

    const [selectedButtonIndex, setSelectedButtonIndex] = useState<number | null>(null);
    const [enabled, setEnabled] = useState(true); // TODO: not implemented yet, always will be true
    const buttons = [];

    const handleClick = (index: number, scoreIndex: number, score: number) => {
        setSelectedButtonIndex(index);
        onInputClick(scoreIndex, score);
    }

    // Create each button with ascending or descending numbers.
    for (let index = 0; index < data.buttonLabels.length; ++index) {
        let score = data.buttonScores[index];
        buttons.push(
            <button
                className="basis-7 py-2 px-2 text-black font-semibold border-2 border-black rounded-lg"
                key={index}
                value={score}
                style={{ backgroundColor: selectedButtonIndex === index ? (enabled ? themeColor : "lightgrey") : "white" }}
                onClick={() => handleClick(index, data.scoreIndex, score)}
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