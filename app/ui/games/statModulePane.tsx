"use client";

import { useState } from "react";
import { ButtonModule } from "../buttonModule";

import { StatModuleData } from "../statModule";
import { ButtonModulePane } from "./buttonModulePane";

// TODO EDIT ALL COMMENTS

/**
 * Stat module for a single game, that the user interacts with to input their stat for the game.
 * @param props Component props
 * @returns Stat module
 */
export const StatModulePane = ({ data }: { data: StatModuleData }) => {
    const inputModules = [];

    // Create each input module using data from the prop.
    for (let index = 0; index < data.inputModules.length; ++index) {
        inputModules.push(
            <ButtonModulePane
                key={index}
                data={data.inputModules[index]}
                themeColor={data.themeColor}
            />
        );
    }

    return (
        <div className="relative transition-all duration-300">
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
                    <div className="text-sm bg-white border-2 border-white rounded-md mx-10">
                        {data.hardModeMultiplier !== 1
                            ? `Hard mode: ×${data.hardModeMultiplier}`
                            : "No hard mode"}
                    </div>
                    {inputModules}
                </div>
            </div>

            {/* Title bar of the stat module pane*/}
            <div
                className="absolute flex px-1 top-0 left-0 h-fit w-full justify-center opacity-100 transition-all duration-300 border-t-4 border-l-4 border-r-4 rounded-t-2xl"
                style={{
                    borderColor: `${data.themeColor}`,
                }}
            >
                <h2 className="text-2xl font-bold">{data.gameName}</h2>
            </div>
        </div>
    );
};
