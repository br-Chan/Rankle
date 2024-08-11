'use client'

import { InputModule, InputModuleData } from "./inputModule";

export type StatModuleData = {
    id: string;
    gameName: string;
    inputModules: InputModuleData[];
    themeColor: string;
};

export const StatModule = ({ data }: { data: StatModuleData }) => {

    const inputModules = [];

    const handleInputClick = (scoreIndex: number, score: number) => {
        console.log(scoreIndex + ": " + score);
    }

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
        <div
            className="w-72 py-2 px-5 text-center border-4 rounded-2xl"
            style={{
                borderColor: data.themeColor,
                backgroundColor: `${data.themeColor}25`,
            }}
        >
            <h2 className="py-4 text-2xl font-bold">{data.gameName}</h2>
            {inputModules}
        </div>

    );

    // padding: 1.5em;
    // border: 3px solid;
    // border-radius: 16px;
    // border-color: gold;
    // background-color: rgb(255 215 0 / 25%);
}