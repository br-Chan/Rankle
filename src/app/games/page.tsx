"use client";

import { useEffect, useState } from "react";
import { StatModulePane } from "@/features/statmodules/components/statModulePane";
import { getAllStatModules } from "@/features/statmodules/api/statModulesCollection";
import { deleteStatModule as deleteStatModuleInFirestore } from "@/features/statmodules/api/statModulesCollection";
import { statModulesFirestoreData } from "@/features/statmodules/types/firestore";

/**
 * Page where users can view user-created stat modules and add them to their own lists.
 *
 * @returns Games page
 */
const Games = () => {
    // Array of data for all stat modules fetched from Firestore.
    const [statModulesData, setStatModulesData] = useState<statModulesFirestoreData[]>([]);

    // Fetch data when component 'mounts' (not every time it re-renders).
    useEffect(() => {
        async function fetchData() {
            const statModuleDocuments: statModulesFirestoreData[] = await getAllStatModules();
            setStatModulesData(statModuleDocuments);
        }
        fetchData();
    }, []);

    const deleteStatModule = (statModuleId: string) => {
        deleteStatModuleInFirestore(statModuleId);
        setStatModulesData(statModulesData.filter((data) => data.id !== statModuleId));
    };

    return (
        <>
            <h1 className="gap-2 text-center text-2xl font-black">GAMES</h1>
            <p className="mb-2 text-center">Peruse the catalogue for games to add to your list!</p>

            {/* Stat module panes */}
            {statModulesData.length === 0 ? (
                <p className="flex flex-col rounded-xl bg-amber-300 px-16 py-1 text-center font-mono text-2xl text-black lg:mt-10 lg:flex-row">
                    <span>Loading all games</span>
                    <span>...</span>
                </p>
            ) : (
                <div className="mb-32 grid w-full grid-cols-[repeat(auto-fill,288px)] justify-center gap-4 pt-4 text-center">
                    {statModulesData.map((item, index) => (
                        <StatModulePane
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
                            deleteStatModule={deleteStatModule}
                        />
                    ))}
                </div>
            )}
        </>
    );
};

export default Games;
