"use client";

import { StatModule, StatModuleData } from "./ui/statModule";
import { ButtonModuleData } from "./ui/buttonModule";
import { useEffect, useState } from "react";
import { useAuth } from "./hooks/useAuth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";
import {
    addStatModuleToUser,
    convertStatModuleFirestoreData,
    fetchUserStatModules,
    statModulesFirestoreData,
    removeStatModuleFromUser as removeStatModuleFromUserInFirestore,
} from "./lib/firestoreUtils";

/**
 * List of Ranks and their attributed minimum scores to attain it.
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

    const [rank, setRank] = useState("R");

    // Fetch user data, initialising default data first if new user.
    useEffect(() => {
        fetchUserData();
    }, [user]);

    useEffect(() => {
        updateRank();
    }, [statModuleData])

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
                console.log("adding stat modules to new user");
                await Promise.all([
                    addStatModuleToUser(user.uid, "fNwVk0dhntmBWj6oAT0U"), // Wordle
                    addStatModuleToUser(user.uid, "gzF6eumgBN9QiVF1LxM4"), // Connections
                    addStatModuleToUser(user.uid, "SHP4lWxnM5ONQJpRK5sH"), // Strands
                    addStatModuleToUser(user.uid, "ZyUFFw9Cdwix8w4UvW9O"), // Mini Crossword
                ]);
            }

            const statModulesFirestoreData: statModulesFirestoreData[] = await fetchUserStatModules(
                user.uid
            );

            setStatModuleData(
                statModulesFirestoreData.map((data) => {
                    return convertStatModuleFirestoreData(data);
                })
            );
        } else {
            console.log("User data doesn't exist yet.");
        }
    }

    /**
     * Returns the stat module data of the stat module associated with the input id.
     *
     * @param statModuleId id of the stat module to find
     * @returns the stat module found
     */
    const getStatModuleData = (statModuleId: string) => {
        return statModuleData.find(({ id }) => statModuleId === id);
    };

    /**
     * Returns the input module data of the input module in the stat module from the inputs.
     *
     * @param statModuleId id of the stat module that the input module is in
     * @param inputModuleId id of the input module to find
     * @returns the input module found
     */
    const getInputModuleData = (statModuleId: string, inputModuleId: string) => {
        const statModule = getStatModuleData(statModuleId);
        if (statModule === undefined) {
            return undefined;
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
        console.log(data.queryText + ": " + score + " in index " + index);

        // Update input module's selected button index in its data.
        const inputModuleDataToChange = getInputModuleData(data.statModuleId, data.id);
        if (inputModuleDataToChange === undefined) {
            return; // To handle finding no matching score index
        }
        inputModuleDataToChange.selectedButtonIndex = index;

        updateRank();
    };

    const removeStatModuleFromUser = (statModuleId: string) => {
        removeStatModuleFromUserInFirestore(user.uid, statModuleId);
        setStatModuleData(statModuleData.filter((data) => data.id !== statModuleId));
        
        updateRank();
    };

    /**
     * Calculates the average scores of all enabled input modules, and updates the display.
     */
    const updateRank = () => {
        let numberOfEnabledScores = 0; // to divide the sum of enabled scores.

        // Calculate the sum of enabled scores taking into account hard mode multipliers.
        let sum = 0;
        statModuleData.forEach((statModule) => {
            // iterate through stat modules
            let currentScore = 0;
            if (statModule.enabled) {
                statModule.inputModules.forEach((buttonModule) => {
                    // iterate through input modules
                    if (buttonModule.selectedButtonIndex != null) {
                        ++numberOfEnabledScores;
                        currentScore =
                            buttonModule.buttonScores[buttonModule.selectedButtonIndex] *
                            (statModule.hardModeEnabled ? statModule.hardModeMultiplier : 1);
                        sum += currentScore;
                    }
                });
            }
        });

        // Calculate the average score.
        const avg: number = sum / numberOfEnabledScores;
        const scoreDisplay: string = isNaN(avg) ? "" : " (" + Math.floor(avg) + ")";

        // Update the rank.
        setRank((ranks.find(({ threshold }) => avg >= threshold)?.rank || "R") + scoreDisplay);
    };

    return (
        <main>
            {/* Rank display */}
            <div className="pointer-events-none fixed bottom-0 left-0 z-10 flex h-40 w-full items-end justify-center text-lg font-black bg-gradient-to-t from-white via-white lg:via-70% to-transparent lg:to-95% lg:top-0 lg:bottom-auto lg:mt-16 lg:h-32 lg:bg-gradient-to-b">
                <p className="mb-2 flex place-items-center gap-2 text-center text-2xl p-4 lg:mb-8 lg:p-0">
                    RANK
                    <br />
                    {rank}
                </p>
            </div>

            {/* Stat modules */}
            {statModuleData.length === 0 ? (
                <p className="flex place-items-center px-16 py-1 rounded-xl font-mono text-2xl bg-amber-300 lg:mt-28">
                    Loading your games...
                </p>
            ) : (
                <div
                    className="
                    mb-32 grid gap-4 text-center
                    grid-cols-1 w-[288px]
                    md:grid-cols-2 md:w-[576px]
                    lg:grid-cols-3 lg:w-[864px]
                    2xl:grid-cols-4 2xl:w-[1152px]
                    lg:mt-20
                "
                >
                    {statModuleData.map((data, index) => (
                        <StatModule
                            key={data.id}
                            data={data}
                            handleEnableClick={handleEnableClick}
                            handleHardModeClick={handleHardModeClick}
                            handleInputClick={handleInputClick}
                            removeStatModuleFromUser={removeStatModuleFromUser}
                        />
                    ))}
                </div>
            )}
        </main>
    );
}
