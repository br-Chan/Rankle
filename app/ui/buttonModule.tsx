"use client";

import { useState } from "react";

export type ButtonModuleData = {
    statModuleId: string;
    scoreIndex: number;
    queryText: string;
    buttonLabels: (number | string)[];
    buttonScores: number[];
    enabled: boolean;
}

export const ButtonModule = ({
    data,
    themeColor,
    onInputClick,
}: {
    data: ButtonModuleData,
    themeColor: string,
    onInputClick: (scoreIndex: number, score: number) => void
}) => {

    const [selectedButtonIndex, setSelectedButtonIndex] = useState<number | null>(null);
    const buttons = [];

    const handleClick = (index: number, scoreIndex: number, score: number) => {
        setSelectedButtonIndex(index);
        onInputClick(scoreIndex, score);
    }

    // Create each button with ascending or descending numbers.
    for (let index = 0; index < data.buttonLabels.length; ++index) {
        let score = data.buttonScores[index];
        buttons.push(
            <div className="text-black font-semibold border-2 border-black rounded-lg" key={index}>
                <button
                    className="peer w-full py-2 transition-colors duration-300  rounded-md"
                    value={score}
                    style={{ backgroundColor: selectedButtonIndex === index ? themeColor : "white" }}
                    onClick={() => handleClick(index, data.scoreIndex, score)}
                >
                    {data.buttonLabels[index]}
                </button>
                <div
                    className="absolute invisible opacity-0 peer-hover:visible peer-hover:opacity-100 border-2 border-black text-sm rounded py-1 px-0.5 z-10 mb-1"
                    style={{
                        backgroundColor: selectedButtonIndex === index ? "white" : themeColor,
                        color: selectedButtonIndex === index ? themeColor : "white",
                        transition: "opacity 0.3s ease, background-color 0.3s ease, color 0.3s ease",
                        transitionDelay: "0.5s, 0s, 0s",
                    }}
                >
                    Score: {score}
                </div>
            </div>

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