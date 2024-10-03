"use client";

import { StatModuleData } from "../statModule";
import { ButtonModulePane } from "./buttonModulePane";

/**
 * Stat module pane for a single game, displaying all information about the stat module. The user
 * can select the stat module pane to add it to their personalised list of stat modules.
 *
 * @param props Component props
 * @returns Stat module pane
 */
export const StatModulePane = ({ data }: { data: StatModuleData }) => {
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
                <div className="mt-6 transition-all duration-300">
                    {/* Horizontal line at the top of the body to divide it from title bar */}
                    <div
                        className="border-2 mb-2"
                        style={{
                            borderColor: `${data.themeColor}`,
                        }}
                    ></div>

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
                className="absolute flex px-1 top-0 left-0 h-fit w-full text-2xl font-bold justify-around opacity-100 transition-all duration-300 border-t-4 border-l-4 border-r-4 rounded-t-2xl"
                style={{
                    borderColor: `${data.themeColor}`,
                }}
            >
                <button className="text-2xl font-black text-green-500">+</button>
                <h2 className="">{data.gameName}</h2>
                <button className="text-red-500">X</button>
            </div>
        </div>
    );
};
