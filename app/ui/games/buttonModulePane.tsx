"use client";

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
    themeColor,
}: {
    data: ButtonModuleData;
    themeColor: string;
}) => {
    const buttons = [];

    // Create each button using data from the prop.
    for (let index = 0; index < data.buttonLabels.length; ++index) {
        let score = data.buttonScores[index];
        buttons.push(
            <div className="text-sm border-black rounded-lg" key={index}>
                <div className="w-full text-black font-semibold bg-white rounded-t-md">
                    {data.buttonLabels[index]}
                </div>
                <div
                    className="w-full text-gray-700 bg-white rounded-b-md border-t-2"
                    style={{
                        borderColor: `${themeColor}`,
                    }}
                >
                    {data.buttonScores[index]}
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
