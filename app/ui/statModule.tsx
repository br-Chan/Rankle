"use client";

import { useState } from "react";
import { EnableSwitch } from "./enableSwitch";
import { ButtonModule, ButtonModuleData } from "./buttonModule";
import { HardModeModule } from "./hardModeModule";

export type StatModuleData = {
    id: string;
    gameName: string;
    inputModules: ButtonModuleData[];
    themeColor: string;
    enabled: boolean;
    hasHardMode: boolean;
    hardModeEnabled: boolean;
    hardModeMultiplier: number;
};

export const StatModule = ({
    data,
    handleEnableClick,
    handleHardModeClick,
    handleInputClick,
}: {
    data: StatModuleData,
    handleEnableClick: (statModuleId: string) => void,
    handleHardModeClick: (statModuleId: string) => void,
    handleInputClick: (scoreIndex: number, score: number) => void,
}) => {

    const inputModules = [];
    const [opacity, setOpacity] = useState<number>(1);

    // Create each input module.
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

    const handleEnableClickInStatModule = (id: string) => {
        handleEnableClick(id);
        setOpacity(opacity === 0.4 ? 1 : 0.4);
    }

    return (
        <div
            className="relative transition-all duration-300"
            style={{
                opacity: opacity
            }}
        >
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
                    {data.hasHardMode ? (
                        <HardModeModule onHardModeClick={() => handleHardModeClick(data.id)} />
                    ) : null}
                    {inputModules}
                </div>

            </div>
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
}