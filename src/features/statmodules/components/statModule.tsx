"use client";

import { useState } from "react";
import { ButtonModule } from "./buttonModule";
import { ButtonModuleData } from "../types/display";
import { HardModeModule } from "./hardModeModule";
import { HiXMark } from "react-icons/hi2";
import { EnableSwitch } from "@/components/enableSwitch";
import { ThemedHoverComponent } from "@/components/themedHoverComponent";
import { StatModuleData } from "../types/display";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

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
    deleteUserStatModule,
}: {
    data: StatModuleData;
    handleEnableClick: (statModuleId: string) => void;
    handleHardModeClick: (statModuleId: string) => void;
    handleInputClick: (data: ButtonModuleData, index: number, score: number) => void;
    deleteUserStatModule: (statModuleId: string) => void;
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
            className="relative w-72 transition-opacity duration-300"
            style={{
                opacity: opacity,
            }}
        >
            {/* Body of the stat module */}
            <div
                className="h-full rounded-2xl border-4 px-5 py-2 text-center shadow-lg transition-opacity duration-300"
                style={{
                    borderColor: `${data.themeColor}`,
                    backgroundColor: `${data.themeColor}25`,
                }}
            >
                <div className="mt-7 flex flex-col transition-opacity duration-300">
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
                        onEnableClick={() => handleEnableClickInStatModule(data.id)}
                        backgroundColor={data.themeColor}
                    />
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <h2 className="w-44 truncate text-left text-xl font-bold hover:cursor-default">
                                {data.gameName}
                            </h2>
                        </TooltipTrigger>
                        <TooltipContent className="-translate-y-1">{data.gameName}</TooltipContent>
                    </Tooltip>
                </div>
                <div className="mr-1 flex h-10 items-center">
                    {/* <button className="font-bold text-blue-500 m-1">/</button> */}

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <ThemedHoverComponent
                                hoveredBackgroundColor={data.themeColor}
                                className="rounded-md"
                            >
                                <button
                                    className="flex cursor-default items-center dark:text-white"
                                    onClick={() => {
                                        deleteUserStatModule(data.id);
                                    }}
                                >
                                    <HiXMark className="h-6 w-6" />
                                </button>
                            </ThemedHoverComponent>
                        </TooltipTrigger>
                        <TooltipContent>remove from your list</TooltipContent>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
};
