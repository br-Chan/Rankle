"use client";

import { useState } from "react";
import { ThemedHoverComponent } from "@/components/themedHoverComponent";
import { useAuth } from "@/features/firebaseAuth/hooks/useAuth";
import { addUserStatModule } from "../api/usersCollection";
import { HiTrash, HiUserPlus } from "react-icons/hi2";
import { ButtonModulePane } from "./buttonModulePane";
import { StatModuleData } from "../types/display";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

/**
 * Stat module pane for a single game, displaying all information about the stat module. The user
 * can select the stat module pane to add it to their personalised list of stat modules.
 *
 * @param props Component props
 * @returns Stat module pane
 */
export const StatModulePane = ({
    data,
    deleteStatModule,
}: {
    data: StatModuleData;
    deleteStatModule: (statModuleId: string) => void;
}) => {
    const { currentUser } = useAuth();
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
        <div className="relative w-72 cursor-default">
            {/* Title bar of the stat module pane*/}
            <div
                className="absolute left-0 top-0 flex h-9 w-full items-center justify-between rounded-t-2xl border-l-4 border-r-4 border-t-4 px-3 opacity-100"
                style={{
                    borderColor: `${data.themeColor}`,
                }}
            >
                <Tooltip>
                    <TooltipTrigger asChild>
                        <ThemedHoverComponent
                            className="flex cursor-pointer items-center rounded-md border-2 border-black dark:border-white"
                            hoveredBackgroundColor="#4ade80" // text-green-400
                        >
                            <button
                                className="text-sm"
                                onClick={() => {
                                    addUserStatModule(currentUser!.uid, data.id); // TODO: user has exclamation
                                    setAdded(true);
                                }}
                            >
                                <HiUserPlus className="h-6 w-6 px-[2px] dark:text-white" />
                            </button>
                        </ThemedHoverComponent>
                    </TooltipTrigger>
                    <TooltipContent>{added ? "Added!" : "Add to your list"}</TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <h2 className="w-44 truncate text-xl font-bold">{data.gameName}</h2>
                    </TooltipTrigger>
                    <TooltipContent className="-translate-y-1">{data.gameName}</TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <ThemedHoverComponent
                            className="flex cursor-pointer items-center rounded-md border-2 border-black dark:border-white"
                            hoveredBackgroundColor="#ef4444" // text-red-500
                        >
                            <button
                                className="relative text-sm dark:text-white"
                                onClick={() => {
                                    deleteStatModule(data.id);
                                }}
                            >
                                <HiTrash className="peer h-6 w-6 px-[2px]" />
                            </button>
                        </ThemedHoverComponent>
                    </TooltipTrigger>
                    <TooltipContent>Delete from global</TooltipContent>
                </Tooltip>
            </div>

            {/* Body of the stat module pane*/}
            <div
                className="h-full rounded-2xl border-4 px-5 py-2 text-center shadow-lg"
                style={{
                    borderColor: `${data.themeColor}`,
                    backgroundColor: `${data.themeColor}25`,
                }}
            >
                <div className="mt-6 space-y-2">
                    {/* Horizontal line at the top of the body to divide it from title bar */}
                    <div
                        className="border-2"
                        style={{
                            borderColor: `${data.themeColor}`,
                        }}
                    ></div>

                    {/* Theme colour */}
                    <div className="mx-10 rounded-md bg-white p-[2px] text-sm text-black dark:bg-zinc-800 dark:text-white">
                        {`Theme: ${data.themeColor}`}
                    </div>

                    {/* Hard mode display pane */}
                    <div className="mx-10 rounded-md bg-white p-[2px] text-sm text-black dark:bg-zinc-800 dark:text-white">
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
