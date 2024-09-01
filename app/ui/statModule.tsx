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
        setOpacity(opacity === 0.25 ? 1 : 0.25);
    }

    return (
        <div className="relative">
            <div
                className="h-full py-2 px-5 text-center transition-all duration-300 border-4 rounded-2xl"
                style={{
                    borderColor: opacity === 1 ? `${data.themeColor}` : `${data.themeColor}40`,
                    backgroundColor: opacity === 1 ? `${data.themeColor}25` : `${data.themeColor}10`,
                }}
            >
                <div
                    className="transition-all duration-300"
                    style={{
                        opacity: opacity
                    }}
                >
                    <h2 className="text-2xl font-bold">{data.gameName}</h2>
                    {data.hasHardMode ? (
                        <HardModeModule onHardModeClick={() => handleHardModeClick(data.id)} />
                    ) : null}
                    {inputModules}
                </div>

            </div>
            <div className="absolute top-2 left-2 h-fit opacity-100">
                <EnableSwitch
                    onEnableClick={() => handleEnableClickInStatModule(data.id)}
                    backgroundColor={data.themeColor} />
            </div>
        </div>

    );
}