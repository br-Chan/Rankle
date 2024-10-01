"use client";

import { useState } from "react";
import { ButtonModuleData } from "../buttonModule";

// TODO EDIT ALL COMMENTS

/**
 * Button module that displays a query, a set of buttons and handles colour changes when a button is
 * selected.
 * 
 * @param props Component props
 * @returns Button module
 */
export const ButtonModulePane = ({
    data,
}: {
    data: ButtonModuleData;
}) => {

    const buttons = [];


    /**
     * Reassigns the button with the 'selected' theme colour to the clicked button and calls the
     * function passed down as a prop to handle storing the new selected score.
     * 
     * @param index the index of the buttons array that has been selected
     * @param scoreIndex the index of the input module data array to update
     * @param score the new updated score
     */
    const handleClick = (index: number, scoreIndex: number, score: number) => {

    };

    // Create each button using data from the prop.
    for (let index = 0; index < data.buttonLabels.length; ++index) {
        let score = data.buttonScores[index];
        buttons.push(
            <div className="relative text-black font-semibold border-black rounded-lg" key={index}>
                <button
                    className="peer w-full py-2 bg-white transition-colors duration-300 rounded-md"
                    value={score}
                    onClick={() => handleClick(index, data.scoreIndex, score)}
                >
                    {data.buttonLabels[index]}
                </button>
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
