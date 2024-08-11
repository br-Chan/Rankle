import Image from "next/image";
import { StatModule } from "./ui/statModule";
import { InputModuleData } from "./ui/inputModule";

let inputModuleData: InputModuleData[] = [];

inputModuleData = [
  // Wordle
  {
    scoreIndex: 0,
    queryText: "Guesses made:",
    buttonLabels: [1, 2, 3, 4, 5, 6, "X"],
    buttonScores: [100, 90, 80, 60, 40, 20, 0],
  },
  // Connections
  {
    scoreIndex: 1,
    queryText: "Groups made | Mistakes remaining",
    buttonLabels: ["4|4", "4|3", "4|2", "4|1", "2|X", "1|X", "0|X"],
    buttonScores: [85, 80, 70, 60, 30, 15, 5],
  },
  //Symble
  {
    scoreIndex: 2,
    queryText: "Guesses made:",
    buttonLabels: [1, 2, 3, 4, 5, 6, 7, 8, "X"],
    buttonScores: [100, 95, 90, 80, 70, 60, 40, 30, 5],
  },
  {
    scoreIndex: 3,
    queryText: "Hints used:",
    buttonLabels: [0, 1, 2, 3, 4, 5, 6, 7],
    buttonScores: [80, 75, 70, 60, 40, 30, 20, 5],
  },
  {
    scoreIndex: 4,
    queryText: "Guesses made:",
    buttonLabels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "X"],
    buttonScores: [100, 95, 90, 80, 75, 65, 55, 45, 30, 10, 0],
  },
  {
    scoreIndex: 5,
    queryText: "Guesses made:",
    buttonLabels: [1, 2, 3, 4, 5, 6, "X"],
    buttonScores: [100, 90, 80, 60, 40, 20, 0],
  },
]

const statModuleData = [
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    gameName: 'Wordle',
    inputModules: [
      inputModuleData[0],
    ],
    themeColor: '#67a561',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    gameName: 'Connections',
    inputModules: [
      inputModuleData[1],
    ],
    themeColor: '#bc70c4',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    gameName: 'Symble',
    inputModules: [
      inputModuleData[2],
    ],
    themeColor: '#f11415',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    gameName: 'Strands',
    inputModules: [
      inputModuleData[3],
    ],
    themeColor: '#a5beba',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    gameName: 'Spotle',
    inputModules: [
      inputModuleData[4],
    ],
    themeColor: '#8370de',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    gameName: 'Bandle',
    inputModules: [
      inputModuleData[5],
    ],
    themeColor: '#fcdcb4',
  },
]


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="fixed left-0 top-0 flex w-full justify-center text-6xl text-black font-bold bg-gradient-to-b from-amber-500 to-yellow-300 border-b-2 border-black pb-3 pt-4 dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          RANKLE
        </h1>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center text-lg font-black bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Rank: R
          </a>
        </div>
      </div>

      <div className="mb-32 grid gap-2 text-center lg:mb-0 lg:max-w-7xl lg:min-w-fit lg:grid-cols-4 lg:text-left">
        {statModuleData.map((data, index) => (
          <StatModule key={index} data={data} />
        ))}
        {/* <StatModule data={statModuleData[0]} />
        <StatModule data={statModuleData[1]} />
        <StatModule data={statModuleData[2]} />
        <StatModule data={statModuleData[3]} />
        <StatModule data={statModuleData[4]} />
        <StatModule data={statModuleData[5]} /> */}
      </div>
    </main>
  );
}
