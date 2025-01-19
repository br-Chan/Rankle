"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import { HoverTooltip } from "@/components/hoverTooltip";
import { db } from "@/config/firebase";
import { useAuth } from "@/features/firebaseAuth/hooks/useAuth";
import { ButtonModuleData } from "@/features/statmodules/types/display";
import { StatModule } from "@/features/statmodules/components/statModule";
import { StatModuleData } from "@/features/statmodules/types/display";
import { getUserStatModules } from "@/features/statmodules/api/usersCollection";
import { deleteUserStatModule as deleteUserStatModuleInFirestore } from "@/features/statmodules/api/usersCollection";
import { addUserStatModule } from "@/features/statmodules/api/usersCollection";
import { convertStatModuleFirestoreData } from "@/features/statmodules/api/firestoreConversion";
import { statModulesFirestoreData } from "@/features/statmodules/types/firestore";

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

type RankleRank = {
    grade: string;
    averageScore: number;
};

/**
 * Home page for Rankle, where the user can interact with stat module, view their Rank and access
 * other pages of the site.
 *
 * @returns Home page
 */
const Home = () => {
    const { currentUser, isUserLoading } = useAuth();
    const [isLoadingComplete, setIsLoadingComplete] = useState(false);

    // Array of data for user's stat modules fetched from Firestore.
    const [statModuleData, setStatModuleData] = useState<StatModuleData[]>([]);

    const [rank, setRank] = useState<RankleRank | undefined>(undefined);

    // Fetch user data, initialising default data first if new user.
    useEffect(() => {
        fetchUserData();
    }, [currentUser]);

    useEffect(() => {
        updateRank();
    }, [statModuleData]);

    async function fetchUserData() {
        if (currentUser) {
            const userStatModulesCollectionRef = collection(
                db,
                "users",
                currentUser.uid,
                "userStatModules"
            );
            const userStatModulesSnap = await getDocs(userStatModulesCollectionRef);

            if (userStatModulesSnap.empty) {
                console.log("adding stat modules to new user");
                await Promise.all([
                    addUserStatModule(currentUser.uid, "fNwVk0dhntmBWj6oAT0U"), // Wordle
                    addUserStatModule(currentUser.uid, "gzF6eumgBN9QiVF1LxM4"), // Connections
                    addUserStatModule(currentUser.uid, "SHP4lWxnM5ONQJpRK5sH"), // Strands
                    addUserStatModule(currentUser.uid, "ZyUFFw9Cdwix8w4UvW9O"), // Mini Crossword
                ]);
            }

            const statModulesFirestoreData: statModulesFirestoreData[] = await getUserStatModules(
                currentUser.uid
            );

            setStatModuleData(
                statModulesFirestoreData.map((data) => {
                    return convertStatModuleFirestoreData(data);
                })
            );

            setIsLoadingComplete(true);
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

    const deleteUserStatModule = (statModuleId: string) => {
        if (currentUser) {
            deleteUserStatModuleInFirestore(currentUser.uid, statModuleId);
            setStatModuleData(statModuleData.filter((data) => data.id !== statModuleId));

            updateRank();
        } else {
            // TODO: decide how to handle this
        }
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
        const avg = Math.floor(sum / numberOfEnabledScores);
        const grade = ranks.find(({ threshold }) => avg >= threshold)?.rank || "unranked";

        // Update the rank.
        setRank(isNaN(avg) ? undefined : { grade: grade, averageScore: avg });
    };

    return (
        <main>
            {/* Rank display */}
            <div className="fixed bottom-0 left-0 z-10 flex h-40 w-full items-end justify-center bg-gradient-to-t from-zinc-200 via-zinc-200 to-transparent lg:bottom-auto lg:top-0 lg:mt-16 lg:h-32 lg:bg-gradient-to-b lg:via-70% lg:to-95% dark:from-zinc-800 dark:via-zinc-800">
                <div className="mb-2 flex w-full items-center space-x-2 p-4 lg:mb-10 lg:p-0">
                    <div className="flex flex-1 justify-end space-x-2">
                        <span>---</span>
                    </div>
                    <div className="mx-auto flex h-16 w-28 cursor-default items-center justify-center rounded-md border-2 border-black bg-white p-4 font-black text-black dark:border-white dark:bg-zinc-900 dark:text-white">
                        {rank ? (
                            <div className="relative">
                                <div className="peer flex justify-center text-4xl">
                                    {rank.grade}
                                </div>
                                <div className="peer flex justify-center">{rank.averageScore}</div>
                                <HoverTooltip
                                    tooltipText={`${rank.grade} - ${rank.averageScore.toString()}`}
                                />
                            </div>
                        ) : (
                            "unranked"
                        )}
                    </div>
                    <div className="flex flex-1 justify-start space-x-2">
                        <span>---</span>
                    </div>
                </div>
            </div>

            {/* Stat modules */}
            {isUserLoading || !isLoadingComplete ? (
                <div className="flex flex-col rounded-xl bg-amber-300 px-16 py-1 text-center font-mono text-2xl text-black lg:mt-24 lg:flex-row">
                    <span>Loading your games</span>
                    <span>...</span>
                </div>
            ) : (
                <div className="mb-32 grid w-[288px] grid-cols-1 gap-4 text-center md:w-[576px] md:grid-cols-2 lg:mt-20 lg:w-[864px] lg:grid-cols-3 2xl:w-[1152px] 2xl:grid-cols-4">
                    {statModuleData.map((data, index) => (
                        <StatModule
                            key={data.id}
                            data={data}
                            handleEnableClick={handleEnableClick}
                            handleHardModeClick={handleHardModeClick}
                            handleInputClick={handleInputClick}
                            deleteUserStatModule={deleteUserStatModule}
                        />
                    ))}
                </div>
            )}
        </main>
    );
};

export default Home;
