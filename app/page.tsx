"use client";

import { StatModule, StatModuleData } from "./ui/statModule";
import { InputModuleData } from "./ui/inputModule";
import { useState } from "react";

const inputModuleData: InputModuleData[] = [
  // Wordle
  {
    statModuleId: 'a',
    scoreIndex: 0,
    queryText: "Guesses made:",
    buttonLabels: [1, 2, 3, 4, 5, 6, "X"],
    buttonScores: [100, 90, 80, 60, 40, 20, 0],
    enabled: true,
  },
  // Connections
  {
    statModuleId: 'b',
    scoreIndex: 1,
    queryText: "Groups made | Mistakes left:",
    buttonLabels: ["4|4", "4|3", "4|2", "4|1", "2|X", "1|X", "0|X"],
    buttonScores: [85, 80, 70, 60, 30, 15, 5],
    enabled: true,
  },
  //Symble
  {
    statModuleId: 'c',
    scoreIndex: 2,
    queryText: "Guesses made:",
    buttonLabels: [1, 2, 3, 4, 5, 6, 7, 8, "X"],
    buttonScores: [100, 95, 90, 80, 70, 60, 40, 30, 5],
    enabled: true,
  },
  // Strands
  {
    statModuleId: 'd',
    scoreIndex: 3,
    queryText: "Hints used:",
    buttonLabels: [0, 1, 2, 3, 4, 5, 6, 7],
    buttonScores: [80, 75, 70, 60, 40, 30, 20, 5],
    enabled: true,
  },
  // Spotle
  {
    statModuleId: 'e',
    scoreIndex: 4,
    queryText: "Guesses made:",
    buttonLabels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "X"],
    buttonScores: [100, 95, 90, 80, 75, 65, 55, 45, 30, 10, 0],
    enabled: true,
  },
  // Bandle
  {
    statModuleId: 'f',
    scoreIndex: 5,
    queryText: "Guesses made:",
    buttonLabels: [1, 2, 3, 4, 5, 6, "X"],
    buttonScores: [100, 90, 80, 60, 40, 20, 0],
    enabled: true,
  },
];

const statModuleData: StatModuleData[] = [
  {
    id: 'a',
    gameName: 'Wordle',
    inputModules: [
      inputModuleData[0],
    ],
    themeColor: '#67a561',
    enabled: true,
  },
  {
    id: 'b',
    gameName: 'Connections',
    inputModules: [
      inputModuleData[1],
    ],
    themeColor: '#bc70c4',
    enabled: true,
  },
  {
    id: 'c',
    gameName: 'Symble',
    inputModules: [
      inputModuleData[2],
    ],
    themeColor: '#f11415',
    enabled: true,
  },
  {
    id: 'd',
    gameName: 'Strands',
    inputModules: [
      inputModuleData[3],
    ],
    themeColor: '#a5beba',
    enabled: true,
  },
  {
    id: 'e',
    gameName: 'Spotle',
    inputModules: [
      inputModuleData[4],
    ],
    themeColor: '#8370de',
    enabled: true,
  },
  {
    id: 'f',
    gameName: 'Bandle',
    inputModules: [
      inputModuleData[5],
    ],
    themeColor: '#fcdcb4',
    enabled: true,
  },
];

const ranks = [
  { threshold: 91, rank: "S" },
  { threshold: 84, rank: "A+" },
  { threshold: 77, rank: "A" },
  { threshold: 70, rank: "A-" },
  { threshold: 63, rank: "B+" },
  { threshold: 56, rank: "B" },
  { threshold: 49, rank: "B-" },
  { threshold: 42, rank: "C+" },
  { threshold: 35, rank: "C" },
  { threshold: 28, rank: "C-" },
  { threshold: 21, rank: "D+" },
  { threshold: 14, rank: "D" },
  { threshold: 7, rank: "D-" },
  { threshold: 0, rank: "F" },
];


export default function Home() {

  const [scores] = useState(Array(inputModuleData.length).fill(null));
  const [rank, setRank] = useState("R");

  const handleEnableClick = (statModuleId: string) => {
    // Enable/disable stat module.
    const statModuleDataToChange = statModuleData.find(({ id }) => statModuleId === id);
    if (statModuleDataToChange === undefined) {return} // To handle finding no matching id
    statModuleDataToChange.enabled = !statModuleDataToChange.enabled;

    // Enable/disable stat module's input module(s).
    inputModuleData.forEach((inputModuleData) => {
      if (inputModuleData.statModuleId === statModuleId) {
        inputModuleData.enabled = !inputModuleData.enabled;
      }
    })

    updateRank();
  }

  const handleInputClick = (scoreIndex: number, score: number) => {
    console.log(scoreIndex + ": " + score);
    scores[scoreIndex] = score;
    updateRank();
  }

  const updateRank = () => {
    let numberOfEnabledScores = 0; // to divide the sum of enabled scores.

    // Calculate the sum of score values that are enabled.
    let sum = 0;
    let currentScore = 0;
    for (let index = 0; index < scores.length; ++index) {
      if (inputModuleData[index].enabled === true && scores[index] !== null) {
        ++numberOfEnabledScores;

        currentScore = scores[index];
        sum += currentScore;
      }
    }

    // Calculate the average score value.
    const avg: number = sum / numberOfEnabledScores;
    const scoreDisplay: string = isNaN(avg) ? "" : " (" +  Math.floor(avg) + ")";

    // Update the rank.
    setRank( (ranks.find(({ threshold }) => avg >= threshold)?.rank || "R") + scoreDisplay);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="fixed left-0 top-0 flex w-full justify-center text-4xl text-black font-bold bg-gradient-to-b from-amber-500 to-yellow-300 border-b-2 border-black pb-1 pt-2 dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          RANKLE
        </h1>
        <div className="pointer-events-none fixed bottom-0 left-0 flex h-40 w-full items-end justify-center text-lg font-black bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <p className="flex place-items-center gap-2 text-center p-4 lg:p-0">
            RANK<br />{rank}
          </p>
        </div>
      </div>

      <div className="mb-32 grid gap-4 text-center md:max-w-7xl md:min-w-fit md:grid-cols-2 lg:grid-cols-3 lg:text-left 2xl:grid-cols-4">
        {statModuleData.map((data, index) => (
          <StatModule key={index} data={data} handleEnableClick={handleEnableClick} handleInputClick={handleInputClick} />
        ))}
      </div>
    </main>
  );
}
