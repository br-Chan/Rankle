"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { HoverTooltip } from "@/components/hoverTooltip";

/**
 * Data type for button modules, to be used when displaying a stat module to the user.
 */
export type ButtonModuleData = {
    id: string;
    statModuleId: string;
    scoreIndex: number;
    queryText: string;
    buttonLabels: (number | string)[];
    buttonScores: number[];
    enabled: boolean;
    selectedButtonIndex: number | null;
};

/**
 * Button module that displays a query, a set of buttons and handles colour changes when a button is
 * selected.
 *
 * @param props Component props
 * @returns Button module
 */
export const ButtonModule = ({
    data,
    themeColor,
    onInputClick,
}: {
    data: ButtonModuleData;
    themeColor: string;
    onInputClick: (data: ButtonModuleData, index: number, score: number) => void;
}) => {
    const { resolvedTheme } = useTheme();
    const [selectedButtonIndex, setSelectedButtonIndex] = useState<number | null>(
        data.selectedButtonIndex
    );
    const buttons = [];

    /**
     * Reassigns the button with the 'selected' theme colour to the clicked button and calls the
     * function passed down as a prop to handle storing the new selected score.
     *
     * @param index the index of the buttons array that has been selected
     * @param scoreIndex the index of the input module data array to update
     * @param score the new updated score
     */
    const handleClick = (data: ButtonModuleData, index: number, score: number) => {
        setSelectedButtonIndex(index);
        onInputClick(data, index, score);
    };

    // Create each button using data from the prop.
    for (let index = 0; index < data.buttonLabels.length; ++index) {
        let score = data.buttonScores[index];
        buttons.push(
            <div
                className="relative rounded-lg border-2 border-black font-semibold dark:border-white"
                key={index}
            >
                <button
                    className="peer w-full rounded-md py-2 text-black duration-300 dark:text-white"
                    value={score}
                    style={{
                        backgroundColor:
                            selectedButtonIndex === index
                                ? themeColor
                                : resolvedTheme === "dark"
                                  ? "#27272a"
                                  : "white",
                        color:
                            selectedButtonIndex === index
                                ? "black"
                                : resolvedTheme === "dark"
                                  ? "white"
                                  : "black",
                        transitionDuration: selectedButtonIndex === index ? "0.3s" : "0s",
                    }}
                    onClick={() => handleClick(data, index, score)}
                >
                    {data.buttonLabels[index]}
                </button>
                <HoverTooltip tooltipText={`Score: ${score}`} />
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
