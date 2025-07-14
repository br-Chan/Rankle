"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { ButtonModuleData } from "../types/display";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

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

    return (
        <>
            <label>{data.queryText}</label>
            <div className="grid grid-cols-3 gap-1">
                {data.buttonLabels.map((label, index) => {
                    const score = data.buttonScores[index];
                    return (
                        <div
                            className="relative rounded-lg border-2 border-black font-semibold dark:border-white"
                            key={index}
                        >
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        className="w-full truncate rounded-md p-2 py-2 text-black duration-300 dark:text-white"
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
                                            transitionDuration:
                                                selectedButtonIndex === index ? "0.3s" : "0s",
                                        }}
                                        onClick={() => handleClick(data, index, score)}
                                    >
                                        {label}
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    {label} ({score})
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    );
                })}
            </div>
        </>
    );
};
