"use client";

import { addStatModuleToUser } from "@/app/lib/firestoreUtils";
import { StatModuleData } from "../statModule";
import { ButtonModulePane } from "./buttonModulePane";
import { useAuth } from "@/app/hooks/useAuth";
import { ThemedHoverComponent } from "../themedHoverComponent";
import { UserPlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { HoverTooltip } from "../hoverTooltip";
import { useState } from "react";

/**
 * Stat module pane for a single game, displaying all information about the stat module. The user
 * can select the stat module pane to add it to their personalised list of stat modules.
 *
 * @param props Component props
 * @returns Stat module pane
 */
export const StatModulePane = ({
    data,
    removeStatModuleFromStatModules,
}: {
    data: StatModuleData;
    removeStatModuleFromStatModules: (statModuleId: string) => void;
}) => {
    const { user } = useAuth();
    const inputModulePanes = [];

    const [added, setAdded] = useState<boolean>(false);

    // Create each input module pane using data from the prop.
    for (let index = 0; index < data.inputModules.length; ++index) {
        inputModulePanes.push(
            <ButtonModulePane
                key={index}
                data={data.inputModules[index]}
                themeColor={data.themeColor}
            />
        );
    }

    return (
        <div className="relative transition-all duration-300 cursor-default">
            {/* Title bar of the stat module pane*/}
            <div
                className="absolute flex justify-between items-center px-3 top-0 left-0 h-9 w-full opacity-100 transition-all duration-300 border-t-4 border-l-4 border-r-4 rounded-t-2xl"
                style={{
                    borderColor: `${data.themeColor}`,
                }}
            >
                <ThemedHoverComponent
                    className="border-2 border-black dark:border-white cursor-pointer flex items-center rounded-md"
                    hoveredBackgroundColor="#4ade80" // text-green-400
                >
                    <button
                        className="relative text-sm h-6 w-6"
                        onClick={() => {
                            addStatModuleToUser(user.uid, data.id);
                            setAdded(true);
                        }}
                    >
                        <UserPlusIcon className="peer px-[2px] dark:text-white" />
                        <HoverTooltip tooltipText={added ? "Added!" : "Add to your list"} />
                    </button>
                </ThemedHoverComponent>

                <h2 className="font-bold text-xl">{data.gameName}</h2>

                <ThemedHoverComponent
                    className="border-2 border-black dark:border-white cursor-pointer flex items-center rounded-md"
                    hoveredBackgroundColor="#ef4444" // text-red-500
                >
                    <button
                        className="relative text-sm h-6 w-6 dark:text-white"
                        onClick={() => {
                            removeStatModuleFromStatModules(data.id);
                        }}
                    >
                        <TrashIcon className="peer px-[2px]" />
                        <HoverTooltip tooltipText="Delete" />
                    </button>
                </ThemedHoverComponent>
            </div>

            {/* Body of the stat module pane*/}
            <div
                className="h-full py-2 px-5 text-center transition-all duration-300 border-4 rounded-2xl"
                style={{
                    borderColor: `${data.themeColor}`,
                    backgroundColor: `${data.themeColor}25`,
                }}
            >
                <div className="mt-6 transition-all duration-300 space-y-2">
                    {/* Horizontal line at the top of the body to divide it from title bar */}
                    <div
                        className="border-2"
                        style={{
                            borderColor: `${data.themeColor}`,
                        }}
                    ></div>

                    {/* Theme colour */}
                    <div className="text-sm text-black bg-white border-2 border-white rounded-md mx-10">
                        {`Theme: ${data.themeColor}`}
                    </div>

                    {/* Hard mode display pane */}
                    <div className="text-sm text-black bg-white border-2 border-white rounded-md mx-10">
                        {data.hardModeMultiplier !== 1
                            ? `Hard mode: ×${data.hardModeMultiplier}`
                            : "No hard mode"}
                    </div>

                    {/* Input module panes */}
                    {inputModulePanes}
                </div>
            </div>
        </div>
    );
};
