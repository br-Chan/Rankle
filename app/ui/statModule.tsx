"use client";

import { useState } from "react";
import { EnableSwitch } from "./enableSwitch";
import { ButtonModule, ButtonModuleData } from "./buttonModule";
import { HardModeModule } from "./hardModeModule";
import { ThemedHoverComponent } from "./themedHoverComponent";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { HoverTooltip } from "./hoverTooltip";

/**
 * Data type for stat modules when displaying them to the user.
 */
export type StatModuleData = {
    id: string;
    gameName: string;
    inputModules: ButtonModuleData[];
    themeColor: string;
    enabled: boolean;
    hardModeEnabled: boolean;
    hardModeMultiplier: number;
};

/**
 * Stat module for a single game, that the user interacts with to input their stat for the game.
 *
 * @param props Component props
 * @returns Stat module
 */
export const StatModule = ({
    data,
    handleEnableClick,
    handleHardModeClick,
    handleInputClick,
    removeStatModuleFromUser,
}: {
    data: StatModuleData;
    handleEnableClick: (statModuleId: string) => void;
    handleHardModeClick: (statModuleId: string) => void;
    handleInputClick: (data: ButtonModuleData, index: number, score: number) => void;
    removeStatModuleFromUser: (statModuleId: string) => void;
}) => {
    const inputModules = [];
    const [opacity, setOpacity] = useState<number>(data.enabled ? 1 : 0.3);

    // Create each input module using data from the prop.
    for (let index = 0; index < data.inputModules.length; ++index) {
        inputModules.push(
            <ButtonModule
                key={index}
                data={data.inputModules[index]}
                themeColor={data.themeColor}
                onInputClick={handleInputClick}
            />
        );
    }

    /**
     * Dims the stat module to show that it has been disabled and call the function passed down as a
     * prop to handle disabling it when calculating the Rank.
     *
     * @param id the id of the stat module
     */
    const handleEnableClickInStatModule = (id: string) => {
        handleEnableClick(id);
        setOpacity(opacity === 1 ? 0.3 : 1);
    };

    return (
        <div
            className="relative transition-all duration-300"
            style={{
                opacity: opacity,
            }}
        >
            {/* Body of the stat module */}
            <div
                className="h-full py-2 px-5 text-center transition-all duration-300 border-4 rounded-2xl"
                style={{
                    borderColor: `${data.themeColor}`,
                    backgroundColor: `${data.themeColor}25`,
                }}
            >
                <div className="mt-7 transition-all duration-300">
                    {/* Horizontal line (decide if should do this) */}
                    {/* <div
                        className="border-2"
                        style={{
                            borderColor: `${data.themeColor}`,
                        }}
                    ></div> */}
                    {data.hardModeMultiplier !== 1 ? (
                        <HardModeModule
                            hardModeMultiplier={data.hardModeMultiplier}
                            onHardModeClick={() => handleHardModeClick(data.id)}
                        />
                    ) : null}
                    {inputModules}
                </div>
            </div>

            {/* Title bar of the stat module */}
            <div
                className="absolute flex justify-between items-center px-1 top-0 left-0 h-10 w-full opacity-100 transition-all duration-300 border-4 rounded-t-2xl"
                style={{
                    borderColor: `${data.themeColor}`,
                    backgroundColor: `${data.themeColor}25`,
                }}
            >
                <div className="flex items-center">
                    <EnableSwitch
                        onEnableClick={() => handleEnableClickInStatModule(data.id)}
                        backgroundColor={data.themeColor}
                    />
                    <h2 className="text-xl font-bold ">{data.gameName}</h2>
                </div>
                <div className="flex items-center h-10 mr-1">
                    {/* <button className="font-bold text-blue-500 m-1">/</button> */}
                    <ThemedHoverComponent
                        hoveredBackgroundColor={data.themeColor}
                        className="rounded-md relative "
                    >
                        <button
                            className="peer cursor-default flex items-center h-6 w-6"
                            onClick={() => {
                                removeStatModuleFromUser(data.id);
                            }}
                        >
                            <XMarkIcon />
                        </button>
                        <HoverTooltip tooltipText="remove" />
                    </ThemedHoverComponent>
                </div>
            </div>
        </div>
    );
};
