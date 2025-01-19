"use client";

import { useState } from "react";
import { HoverTooltip } from "@/components/hoverTooltip";
import { ThemedHoverComponent } from "@/components/themedHoverComponent";
import { useAuth } from "@/features/firebaseAuth/hooks/useAuth";
import { addUserStatModule } from "../api/usersCollection";
import { UserPlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { ButtonModulePane } from "./buttonModulePane";
import { StatModuleData } from "../types/display";

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
        <div className="relative cursor-default">
            {/* Title bar of the stat module pane*/}
            <div
                className="absolute left-0 top-0 flex h-9 w-full items-center justify-between rounded-t-2xl border-l-4 border-r-4 border-t-4 px-3 opacity-100"
                style={{
                    borderColor: `${data.themeColor}`,
                }}
            >
                <ThemedHoverComponent
                    className="flex cursor-pointer items-center rounded-md border-2 border-black dark:border-white"
                    hoveredBackgroundColor="#4ade80" // text-green-400
                >
                    <button
                        className="relative h-6 w-6 text-sm"
                        onClick={() => {
                            addUserStatModule(currentUser!.uid, data.id); // TODO: user has exclamation
                            setAdded(true);
                        }}
                    >
                        <UserPlusIcon className="peer px-[2px] dark:text-white" />
                        <HoverTooltip tooltipText={added ? "Added!" : "Add to your list"} />
                    </button>
                </ThemedHoverComponent>

                <h2 className="text-xl font-bold">{data.gameName}</h2>

                <ThemedHoverComponent
                    className="flex cursor-pointer items-center rounded-md border-2 border-black dark:border-white"
                    hoveredBackgroundColor="#ef4444" // text-red-500
                >
                    <button
                        className="relative h-6 w-6 text-sm dark:text-white"
                        onClick={() => {
                            deleteStatModule(data.id);
                        }}
                    >
                        <TrashIcon className="peer px-[2px]" />
                        <HoverTooltip tooltipText="Delete" />
                    </button>
                </ThemedHoverComponent>
            </div>

            {/* Body of the stat module pane*/}
            <div
                className="h-full rounded-2xl border-4 px-5 py-2 text-center"
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
