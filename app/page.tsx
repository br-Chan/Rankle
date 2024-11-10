"use client";

import { StatModule, StatModuleData } from "./ui/statModule";
import { ButtonModuleData } from "./ui/buttonModule";
import { useEffect, useState } from "react";
import { useAuth } from "./hooks/useAuth";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";
import {
    addStatModuleToUser,
    convertStatModuleFirestoreData,
    fetchUserStatModules,
    statModulesFirestoreData,
} from "./lib/firestoreUtils";

// Hard-coded input module data for every stat module.
const inputModuleData: ButtonModuleData[] = [
    // Wordle
    {
        id: "1",
        statModuleId: "a",
        scoreIndex: 0,
        queryText: "Guesses made:",
        buttonLabels: [1, 2, 3, 4, 5, 6, "X"],
        buttonScores: [100, 90, 80, 60, 40, 20, 0],
        enabled: true,
        selectedButtonIndex: null,
    },
    // Connections
    {
        id: "2",
        statModuleId: "b",
        scoreIndex: 1,
        queryText: "Groups made | Mistakes left:",
        buttonLabels: ["4|4", "4|3", "4|2", "4|1", "2|X", "1|X", "0|X"],
        buttonScores: [85, 80, 70, 60, 30, 15, 5],
        enabled: true,
        selectedButtonIndex: null,
    },
    //Symble
    {
        id: "3",
        statModuleId: "c",
        scoreIndex: 2,
        queryText: "Guesses made:",
        buttonLabels: [1, 2, 3, 4, 5, 6, 7, 8, "X"],
        buttonScores: [100, 95, 90, 80, 70, 60, 40, 30, 5],
        enabled: true,
        selectedButtonIndex: null,
    },
    // Strands
    {
        id: "4",
        statModuleId: "d",
        scoreIndex: 3,
        queryText: "Hints used:",
        buttonLabels: [0, 1, 2, 3, 4, 5, 6, 7],
        buttonScores: [80, 75, 70, 60, 40, 30, 20, 5],
        enabled: true,
        selectedButtonIndex: null,
    },
    // Spotle
    {
        id: "5",
        statModuleId: "e",
        scoreIndex: 4,
        queryText: "Guesses made:",
        buttonLabels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "X"],
        buttonScores: [100, 95, 90, 80, 75, 65, 55, 45, 30, 10, 0],
        enabled: true,
        selectedButtonIndex: null,
    },
    // Bandle
    {
        id: "6",
        statModuleId: "f",
        scoreIndex: 5,
        queryText: "Guesses made:",
        buttonLabels: [1, 2, 3, 4, 5, 6, "X"],
        buttonScores: [100, 90, 80, 60, 40, 20, 0],
        enabled: true,
        selectedButtonIndex: null,
    },
];

// Hard-coded stat module data for the home page.
// const statModuleData: StatModuleData[] = [
//     {
//         id: "a",
//         gameName: "Wordle",
//         inputModules: [inputModuleData[0]],
//         themeColor: "#67a561",
//         enabled: true,
//         hardModeEnabled: false,
//         hardModeMultiplier: 1.1,
//     },
//     {
//         id: "b",
//         gameName: "Connections",
//         inputModules: [inputModuleData[1]],
//         themeColor: "#bc70c4",
//         enabled: true,
//         hardModeEnabled: false,
//         hardModeMultiplier: 1,
//     },
//     {
//         id: "c",
//         gameName: "Symble",
//         inputModules: [inputModuleData[2]],
//         themeColor: "#f11415",
//         enabled: true,
//         hardModeEnabled: false,
//         hardModeMultiplier: 1,
//     },
//     {
//         id: "d",
//         gameName: "Strands",
//         inputModules: [inputModuleData[3]],
//         themeColor: "#a5beba",
//         enabled: true,
//         hardModeEnabled: false,
//         hardModeMultiplier: 1,
//     },
//     {
//         id: "e",
//         gameName: "Spotle",
//         inputModules: [inputModuleData[4]],
//         themeColor: "#8370de",
//         enabled: true,
//         hardModeEnabled: false,
//         hardModeMultiplier: 1,
//     },
//     {
//         id: "f",
//         gameName: "Bandle",
//         inputModules: [inputModuleData[5]],
//         themeColor: "#fcdcb4",
//         enabled: true,
//         hardModeEnabled: false,
//         hardModeMultiplier: 1,
//     },
// ];

/**
 * List of Ranks and their attribute minimum scores to attain it.
 */
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

/**
 * Home page for Rankle, where the user can interact with stat module, view their Rank and access
 * other pages of the site.
 *
 * @returns Home page
 */
export default function Home() {
    const { user } = useAuth();

    // Array of data for user's stat modules fetched from Firestore.
    const [statModuleData, setStatModuleData] = useState<StatModuleData[]>([]);

    const [scores] = useState(Array(inputModuleData.length).fill(null));
    const [rank, setRank] = useState("R");

    // Fetch user data, initialising default data first if new user.
    useEffect(() => {
        async function fetchUserData() {
            if (user) {
                const userStatModulesCollectionRef = collection(
                    db,
                    "users",
                    user.uid,
                    "userStatModules"
                );
                const userStatModulesSnap = await getDocs(userStatModulesCollectionRef);

                if (userStatModulesSnap.empty) {
                    console.log("adding stat modules to user");
                    await Promise.all([
                        addStatModuleToUser(user.uid, "fNwVk0dhntmBWj6oAT0U"),
                        addStatModuleToUser(user.uid, "gzF6eumgBN9QiVF1LxM4"),
                        addStatModuleToUser(user.uid, "ZNWNu2GzygcgvcqrcPxf"),
                        addStatModuleToUser(user.uid, "SHP4lWxnM5ONQJpRK5sH"),
                        addStatModuleToUser(user.uid, "fNwVk0dhntmBWj6oAT0U"),
                        addStatModuleToUser(user.uid, "ZyUFFw9Cdwix8w4UvW9O"),
                    ]);
                }

                const statModulesFirestoreData: statModulesFirestoreData[] =
                    await fetchUserStatModules(user.uid);

                setStatModuleData(
                    statModulesFirestoreData.map((data) => {
                        return convertStatModuleFirestoreData(data);
                    })
                );
            } else {
                console.log("User data doesn't exist yet.");
            }
        }
        fetchUserData();
    }, [user]);

    /**
     * Returns the stat module data of the stat module associated with the input id.
     *
     * @param statModuleId id of the stat module to find
     * @returns the stat module found
     */
    const getStatModuleData = (statModuleId: string) => {
        return statModuleData.find(({ id }) => statModuleId === id);
    };

    const getInputModuleData = (statModuleId: string, inputModuleId: string) => {
        const statModule = getStatModuleData(statModuleId);
        if (statModule === undefined) {
            return;
        }

        return statModule.inputModules.find(({ id }) => inputModuleId === id);
    };

    /**
     * Disables the stat module and all of its input modules.
     *
     * @param statModuleId the id of the stat module to disable
     */
    const handleEnableClick = (statModuleId: string) => {
        // Enable/disable stat module.
        const statModuleDataToChange = getStatModuleData(statModuleId);
        if (statModuleDataToChange === undefined) {
            return; // To handle finding no matching id
        }
        statModuleDataToChange.enabled = !statModuleDataToChange.enabled;

        // Enable/disable stat module's input module(s).
        inputModuleData.forEach((inputModuleData) => {
            if (inputModuleData.statModuleId === statModuleId) {
                inputModuleData.enabled = !inputModuleData.enabled;
            }
        });

        // Update the Rank now that a stat module has been enabled/disabled.
        updateRank();
    };

    /**
     * Turns on hard mode for the stat module associated with the input id.
     *
     * @param statModuleId id of the stat module whose hard mode checkbox was checked/unchecked
     */
    const handleHardModeClick = (statModuleId: string) => {
        const statModuleDataToChange = getStatModuleData(statModuleId);
        if (statModuleDataToChange === undefined) {
            return; // To handle finding no matching id
        }
        statModuleDataToChange.hardModeEnabled = !statModuleDataToChange.hardModeEnabled;

        // Update the Rank now that hard mode has been turned on for a stat module.
        updateRank();
    };

    /**
     * Updates the score for a specific input module and updates the overall Rank.
     *
     * @param data the button module data of the input module that has been clicked on
     * @param index the index of the buttons array that has been selected in the input module
     * @param score the new score to update with
     */
    const handleInputClick = (data: ButtonModuleData, index: number, score: number) => {
        console.log(data.queryText + ": " + score);
        // scores[scoreIndex] = score;

        // Update input module's selected button index in its data.
        const inputModuleDataToChange = getInputModuleData(data.statModuleId, data.id);
        if (inputModuleDataToChange === undefined) {
            return; // To handle finding no matching score index
        }
        inputModuleDataToChange.selectedButtonIndex = index;

        updateRank();

        // // Enable/disable stat module.
        // const statModuleDataToChange = getStatModuleData(statModuleId);
        // if (statModuleDataToChange === undefined) {
        //     return; // To handle finding no matching id
        // }
        // statModuleDataToChange.enabled = !statModuleDataToChange.enabled;

        // // Enable/disable stat module's input module(s).
        // inputModuleData.forEach((inputModuleData) => {
        //     if (inputModuleData.statModuleId === statModuleId) {
        //         inputModuleData.enabled = !inputModuleData.enabled;
        //     }
        // });
    };

    /**
     * Calculates the average scores of all enabled input modules, and updates the display.
     */
    const updateRank = () => {
        let numberOfEnabledScores = 0; // to divide the sum of enabled scores.

        // Calculate the sum of score values that are enabled.
        let sum = 0;
        statModuleData.forEach((statModule) => {
            let currentScore = 0;
            if (statModule.enabled) {
                statModule.inputModules.forEach((buttonModule) => {
                    if (buttonModule.selectedButtonIndex) {
                        ++numberOfEnabledScores;
                        currentScore =
                            buttonModule.buttonScores[buttonModule.selectedButtonIndex] *
                            (statModule.hardModeEnabled ? statModule.hardModeMultiplier : 1);
                        sum += currentScore;
                    }
                });
            }
        });
        // for (let index = 0; index < scores.length; ++index) {
        //     let currentScore = 0;
        //     if (inputModuleData[index].enabled === true && scores[index] !== null) {
        //         ++numberOfEnabledScores;

        //         const parentStatModuleData = statModuleData.find(
        //             ({ id }) => inputModuleData[index].statModuleId === id
        //         );
        //         if (parentStatModuleData === undefined) {
        //             return; // To handle finding no matching id
        //         }

        //         currentScore =
        //             scores[index] *
        //             (parentStatModuleData.hardModeEnabled
        //                 ? parentStatModuleData.hardModeMultiplier
        //                 : 1);
        //         sum += currentScore;
        //     }
        // }

        // Calculate the average score value.
        const avg: number = sum / numberOfEnabledScores;
        const scoreDisplay: string = isNaN(avg) ? "" : " (" + Math.floor(avg) + ")";

        // Update the rank.
        setRank((ranks.find(({ threshold }) => avg >= threshold)?.rank || "R") + scoreDisplay);
    };

    return (
        <main>
            {/* Rank display */}
            <div className="pointer-events-none fixed bottom-0 left-0 z-50 flex h-40 w-full items-end justify-center text-lg font-black bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
                <p className="mb-2 flex place-items-center gap-2 text-center text-2xl p-4 lg:p-0">
                    RANK
                    <br />
                    {rank}
                </p>
            </div>

            {/* Stat modules */}
            <div
                className="
        mb-32 grid gap-4 text-center
        grid-cols-1 w-[288px]
        md:grid-cols-2 md:w-[576px]
        lg:grid-cols-3 lg:w-[864px]
        2xl:grid-cols-4 2xl:w-[1152px]
      "
            >
                {/* {statModuleData.map((data, index) => (
                    <StatModule
                        key={index}
                        data={data}
                        handleEnableClick={handleEnableClick}
                        handleHardModeClick={handleHardModeClick}
                        handleInputClick={handleInputClick}
                    />
                ))} */}
                {statModuleData.length === 0 ? (
                    <p>Loading your games...</p>
                ) : (
                    statModuleData.map((item, index) => (
                        <StatModule
                            key={index}
                            data={{
                                id: item.id,
                                gameName: item.gameName,
                                inputModules: item.inputModules.map((item, index) => {
                                    return {
                                        id: item.id,
                                        statModuleId: item.statModuleId,
                                        scoreIndex: index,
                                        queryText: item.queryText,
                                        buttonLabels: item.buttonLabels,
                                        buttonScores: item.buttonScores,
                                        enabled: true,
                                        selectedButtonIndex: null,
                                    };
                                }),
                                themeColor: item.themeColor,
                                enabled: true,
                                hardModeEnabled: false,
                                hardModeMultiplier: item.hardModeMultiplier,
                            }}
                            handleEnableClick={handleEnableClick}
                            handleHardModeClick={handleHardModeClick}
                            handleInputClick={handleInputClick}
                        />
                    ))
                )}
            </div>
        </main>
    );
}
