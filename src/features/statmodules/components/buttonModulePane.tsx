"use client";

import { ButtonModuleData } from "../types/display";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

/**
 * Button module pane that displays the query and set of buttons of the button module, with each
 * button displaying the label and corresponding score.
 *
 * @param props Component props
 * @returns Button module pane
 */
export const ButtonModulePane = ({
    data,
    themeColor,
}: {
    data: ButtonModuleData;
    themeColor: string;
}) => {
    return (
        <div className="rounded-md p-2" style={{ backgroundColor: `${themeColor}25` }}>
            <div>{data.queryText}</div>
            <div className="grid grid-cols-3 gap-1">
                {data.buttonLabels.map((label, index) => {
                    const score = data.buttonScores[index];
                    return (
                        <Tooltip key={index}>
                            <TooltipTrigger asChild>
                                <div className="peer rounded-lg border-black text-sm" key={index}>
                                    {/* Button label */}
                                    <div className="h-5 w-full truncate rounded-t-md bg-white px-1 font-semibold text-black dark:bg-zinc-800 dark:text-white">
                                        {label}
                                    </div>

                                    {/* Button score */}
                                    <div
                                        className="w-full truncate rounded-b-md border-t-2 bg-white px-1 text-gray-700 dark:bg-zinc-800 dark:text-white"
                                        style={{
                                            borderColor: `${themeColor}`,
                                        }}
                                    >
                                        {score}
                                    </div>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent className="flex flex-col items-center">
                                <span>Label: {label}</span>
                                <span>Score: {score}</span>
                            </TooltipContent>
                        </Tooltip>
                    );
                })}
            </div>
        </div>
    );
};
