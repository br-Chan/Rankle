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
    handleInputClick: (
        data: ButtonModuleData,
        index: number,
        score: number
    ) => void;
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
            className="relative transition-opacity duration-300"
            style={{
                opacity: opacity,
            }}
        >
            {/* Body of the stat module */}
            <div
                className="h-full rounded-2xl border-4 px-5 py-2 text-center transition-opacity duration-300"
                style={{
                    borderColor: `${data.themeColor}`,
                    backgroundColor: `${data.themeColor}25`,
                }}
            >
                <div className="mt-7 transition-opacity duration-300">
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
                className="absolute left-0 top-0 flex h-10 w-full items-center justify-between rounded-t-2xl border-4 px-1 opacity-100 transition-opacity duration-300"
                style={{
                    borderColor: `${data.themeColor}`,
                    backgroundColor: `${data.themeColor}25`,
                }}
            >
                <div className="flex items-center">
                    <EnableSwitch
                        onEnableClick={() =>
                            handleEnableClickInStatModule(data.id)
                        }
                        backgroundColor={data.themeColor}
                    />
                    <h2 className="text-xl font-bold">{data.gameName}</h2>
                </div>
                <div className="mr-1 flex h-10 items-center">
                    {/* <button className="font-bold text-blue-500 m-1">/</button> */}
                    <ThemedHoverComponent
                        hoveredBackgroundColor={data.themeColor}
                        className="relative rounded-md"
                    >
                        <button
                            className="peer flex h-6 w-6 cursor-default items-center dark:text-white"
                            onClick={() => {
                                removeStatModuleFromUser(data.id);
                            }}
                        >
                            <XMarkIcon />
                        </button>
                        <HoverTooltip tooltipText="remove" delay="1000" />
                    </ThemedHoverComponent>
                </div>
            </div>
        </div>
    );
};
