"use client";

import { addStatModuleToUser } from "@/app/lib/firestoreUtils";
import { StatModuleData } from "../statModule";
import { ButtonModulePane } from "./buttonModulePane";
import { useAuth } from "@/app/hooks/useAuth";
import { ThemedHoverComponent } from "../themedHoverComponent";

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
                    <div className="text-sm bg-white border-2 border-white rounded-md mx-4">
                        {`Theme: ${data.themeColor}`}
                    </div>
                    
                    {/* Hard mode display pane */}
                    <div className="text-sm bg-white border-2 border-white rounded-md mx-10">
                        {data.hardModeMultiplier !== 1
                            ? `Hard mode: ×${data.hardModeMultiplier}`
                            : "No hard mode"}
                    </div>

                    {/* Input module panes */}
                    {inputModulePanes}
                </div>
            </div>

            {/* Title bar of the stat module pane*/}
            <div
                className="absolute flex justify-between items-center px-3 top-0 left-0 h-9 w-full font-bold opacity-100 transition-all duration-300 border-t-4 border-l-4 border-r-4 rounded-t-2xl"
                //                className="px-1 h-10 border-4 rounded-t-2xl"
                style={{
                    borderColor: `${data.themeColor}`,
                }}
            >
                <ThemedHoverComponent
                    className="border-2 border-black cursor-pointer flex items-center h-6 rounded-md"
                    unhoveredBackgroundColor={data.themeColor}
                    hoveredBackgroundColor="#4ade80" // text-green-400
                >
                    <button
                        className="text-sm px-[2px]"
                        onClick={() => {
                            addStatModuleToUser(user.uid, data.id);
                        }}
                    >
                        add
                    </button>
                </ThemedHoverComponent>
                <h2 className="text-xl">{data.gameName}</h2>
                <ThemedHoverComponent
                    className="border-2 border-black cursor-pointer flex items-center h-6 rounded-md"
                    unhoveredBackgroundColor={data.themeColor}
                    hoveredBackgroundColor="#ef4444" // text-red-500
                >
                    <button
                        className="text-sm px-[2px]"
                        onClick={() => {
                            removeStatModuleFromStatModules(data.id);
                        }}
                    >
                        del
                    </button>
                </ThemedHoverComponent>
            </div>
        </div>
    );
};
