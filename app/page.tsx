"use client";

import { StatModule, StatModuleData } from "./ui/statModule";
import { InputModuleData } from "./ui/inputModule";
import { useState } from "react";

const inputModuleData: InputModuleData[] = [
  // Wordle
  {
    scoreIndex: 0,
    queryText: "Guesses made:",
    buttonLabels: [1, 2, 3, 4, 5, 6, "X"],
    buttonScores: [100, 90, 80, 60, 40, 20, 0],
    enabled: true,
  },
  // Connections
  {
    scoreIndex: 1,
    queryText: "Groups made | Mistakes left:",
    buttonLabels: ["4|4", "4|3", "4|2", "4|1", "2|X", "1|X", "0|X"],
    buttonScores: [85, 80, 70, 60, 30, 15, 5],
    enabled: true,
  },
  //Symble
  {
    scoreIndex: 2,
    queryText: "Guesses made:",
    buttonLabels: [1, 2, 3, 4, 5, 6, 7, 8, "X"],
    buttonScores: [100, 95, 90, 80, 70, 60, 40, 30, 5],
    enabled: true,
  },
  // Strands
  {
    scoreIndex: 3,
    queryText: "Hints used:",
    buttonLabels: [0, 1, 2, 3, 4, 5, 6, 7],
    buttonScores: [80, 75, 70, 60, 40, 30, 20, 5],
    enabled: true,
  },
  // Spotle
  {
    scoreIndex: 4,
    queryText: "Guesses made:",
    buttonLabels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "X"],
    buttonScores: [100, 95, 90, 80, 75, 65, 55, 45, 30, 10, 0],
    enabled: true,
  },
  // Bandle
  {
    scoreIndex: 5,
    queryText: "Guesses made:",
    buttonLabels: [1, 2, 3, 4, 5, 6, "X"],
    buttonScores: [100, 90, 80, 60, 40, 20, 0],
    enabled: true,
  },
]

const statModuleData: StatModuleData[] = [
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    gameName: 'Wordle',
    inputModules: [
      inputModuleData[0],
    ],
    themeColor: '#67a561',
    enabled: true,
  },
  {
    id: 'a',
    gameName: 'Connections',
    inputModules: [
      inputModuleData[1],
    ],
    themeColor: '#bc70c4',
    enabled: true,
  },
  {
    id: 'b',
    gameName: 'Symble',
    inputModules: [
      inputModuleData[2],
    ],
    themeColor: '#f11415',
    enabled: true,
  },
  {
    id: 'c',
    gameName: 'Strands',
    inputModules: [
      inputModuleData[3],
    ],
    themeColor: '#a5beba',
    enabled: true,
  },
  {
    id: 'd',
    gameName: 'Spotle',
    inputModules: [
      inputModuleData[4],
    ],
    themeColor: '#8370de',
    enabled: true,
  },
  {
    id: 'e',
    gameName: 'Bandle',
    inputModules: [
      inputModuleData[5],
    ],
    themeColor: '#fcdcb4',
    enabled: true,
  },
]

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

  const handleEnableClick = () => {
    console.log("not implemented")
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
      console.log(currentScore + " +");
      }
    }
    console.log("= " + sum);

    // Calculate the average score value.
    const avg = sum / numberOfEnabledScores;
    console.log("Average: " + avg);

    // Update the rank.
    setRank(
      (ranks.find(({ threshold }) => avg >= threshold)?.rank || "R")
      + " (" + Math.floor(avg) + ")"
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="fixed left-0 top-0 flex w-full justify-center text-4xl text-black font-bold bg-gradient-to-b from-amber-500 to-yellow-300 border-b-2 border-black pb-1 pt-2 dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          RANKLE
        </h1>
        <div className="pointer-events-none fixed bottom-0 left-0 flex h-40 w-full items-end justify-center text-lg font-black bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <p className="flex place-items-center gap-2 text-center p-4 lg:p-0">
            RANK<br />{rank}
          </p>
        </div>
      </div>

      <div className="mb-32 grid gap-2 text-center lg:mb-0 lg:max-w-7xl lg:min-w-fit lg:grid-cols-4 lg:text-left">
        {statModuleData.map((data, index) => (
          <StatModule key={index} data={data} handleInputClick={handleInputClick} handleEnableClick={handleEnableClick} />
        ))}
      </div>
    </main>
  );
}
