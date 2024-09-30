"use client";

import { useState } from "react";

// Data type for button modules, to be used when displaying a stat module to the user.
export type ButtonModuleData = {
    statModuleId: string;
    scoreIndex: number;
    queryText: string;
    buttonLabels: (number | string)[];
    buttonScores: number[];
    enabled: boolean;
};

// Button module that displays a query, a set of buttons and handles colour changes when a button is
// selected.
export const ButtonModule = ({
    data,
    themeColor,
    onInputClick,
}: {
    data: ButtonModuleData;
    themeColor: string;
    onInputClick: (scoreIndex: number, score: number) => void;
}) => {
    const [selectedButtonIndex, setSelectedButtonIndex] = useState<number | null>(null);
    const buttons = [];

    // Reassigns the button with the 'selected' theme colour to the clicked button and calls the
    // function passed down as a prop to handle storing the new selected score.
    const handleClick = (index: number, scoreIndex: number, score: number) => {
        setSelectedButtonIndex(index);
        onInputClick(scoreIndex, score);
    };

    // Create each button using data from the prop.
    for (let index = 0; index < data.buttonLabels.length; ++index) {
        let score = data.buttonScores[index];
        buttons.push(
            <div className="text-black font-semibold border-2 border-black rounded-lg" key={index}>
                <button
                    className="peer w-full py-2 transition-colors duration-300  rounded-md"
                    value={score}
                    style={{
                        backgroundColor: selectedButtonIndex === index ? themeColor : "white",
                    }}
                    onClick={() => handleClick(index, data.scoreIndex, score)}
                >
                    {data.buttonLabels[index]}
                </button>
                <div className="absolute invisible opacity-0 peer-hover:visible peer-hover:opacity-100 peer-hover:delay-300 bg-slate-700 text-sm text-white rounded py-1 px-0.5 z-10 mb-1">
                    Score: {score}
                </div>
            </div>
        );
    }

    return (
        <>
            <label>{data.queryText}</label>
            <div className="grid grid-cols-3 gap-1">{buttons}</div>
        </>
    );
};
