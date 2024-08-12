"use client";

import { EnableSwitch } from "./enableSwitch";
import { InputModule, InputModuleData } from "./inputModule";

export type StatModuleData = {
    id: string;
    gameName: string;
    inputModules: InputModuleData[];
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

    // Create each input module.
    for (let index = 0; index < data.inputModules.length; ++index) {
        inputModules.push(
            <InputModule
                key={index}
                data={data.inputModules[index]}
                themeColor={data.themeColor}
                onInputClick={handleInputClick}
            />
        );
    }

    return (
        <div className="relative">
            <div
                className="w-72 py-2 px-5 text-center transition-all duration-300 border-4 rounded-2xl"
                style={{
                    borderColor: data.enabled ? `${data.themeColor}` : `${data.themeColor}40`,
                    backgroundColor: data.enabled ? `${data.themeColor}25` : `${data.themeColor}10`,
                }}
            >
                <div
                    className="transition-all duration-300"
                    style={{
                        opacity: data.enabled ? 1 : 0.25
                    }}
                >
                    <h2 className="text-2xl font-bold">{data.gameName}</h2>
                    {inputModules}
                </div>

            </div>
            <div className="absolute top-2 left-2 h-full opacity-100">
                <EnableSwitch
                    onEnableClick={() => handleEnableClick(data.id)}
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