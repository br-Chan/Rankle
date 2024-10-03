"use client";

import { useState } from "react";
import { EnableSwitch } from "./enableSwitch";
import { ButtonModule, ButtonModuleData } from "./buttonModule";
import { HardModeModule } from "./hardModeModule";

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
 * @param props Component props
 * @returns Stat module
 */
export const StatModule = ({
    data,
    handleEnableClick,
    handleHardModeClick,
    handleInputClick,
}: {
    data: StatModuleData;
    handleEnableClick: (statModuleId: string) => void;
    handleHardModeClick: (statModuleId: string) => void;
    handleInputClick: (index: number, scoreIndex: number, score: number) => void;
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
                className="absolute flex px-1 top-0 left-0 h-fit w-full opacity-100 transition-all duration-300 border-4 rounded-t-2xl"
                style={{
                    borderColor: `${data.themeColor}`,
                    backgroundColor: `${data.themeColor}25`,
                }}
            >
                <EnableSwitch
                    onEnableClick={() => handleEnableClickInStatModule(data.id)}
                    backgroundColor={data.themeColor}
                />
                <h2 className="text-2xl font-bold ">{data.gameName}</h2>
            </div>
        </div>
    );
};
