"use client";

import { useState } from "react";
import { EnableSwitch } from "./enableSwitch";
import { ButtonModule, ButtonModuleData } from "./buttonModule";
import { CheckboxModuleData } from "./checkboxModule";

export type StatModuleData = {
    id: string;
    gameName: string;
    inputModules: (ButtonModuleData | CheckboxModuleData)[];
    themeColor: string;
    enabled: boolean;
};

export const StatModule = ({
    data,
    handleEnableClick,
    handleInputClick,
}: {
    data: StatModuleData,
    handleEnableClick: (statModuleId: string) => void,
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

    const handleEnableClickStat = (id: string) => {
        handleEnableClick(id);
        setOpacity(data.enabled === true ? 1 : 0.25);
    }

    return (
        <div className="relative">
            <div
                className="w-72 h-full py-2 px-5 text-center transition-all duration-300 border-4 rounded-2xl"
                style={{
                    borderColor: data.enabled ? `${data.themeColor}` : `${data.themeColor}40`,
                    backgroundColor: data.enabled ? `${data.themeColor}25` : `${data.themeColor}10`,
                }}
            >
                <div
                    className="transition-all duration-300"
                    style={{
                        opacity: opacity
                    }}
                >
                    <h2 className="text-2xl font-bold">{data.gameName}</h2>
                    {inputModules}
                </div>

            </div>
            <div className="absolute top-2 left-2 h-fit opacity-100">
                <EnableSwitch
                    onEnableClick={() => handleEnableClickStat(data.id)}
                    backgroundColor={data.themeColor} />
            </div>
        </div>

    );

    // padding: 1.5em;
    // border: 3px solid;
    // border-radius: 16px;
    // border-color: gold;
    // background-color: rgb(255 215 0 / 25%);
}