"use client";

import { useEffect, useState } from "react";
import { StatModulePane } from "@/features/statmodules/components/statModulePane";
import { getAllStatModules } from "@/features/statmodules/api/statModulesCollection";
import { deleteStatModule as deleteStatModuleInFirestore } from "@/features/statmodules/api/statModulesCollection";
import { statModulesFirestoreData } from "@/features/statmodules/types/firestore";
import LoadingGamesBar from "@/components/loadingGamesBar";

/**
 * Page where users can view user-created stat modules and add them to their own lists.
 *
 * @returns Games page
 */
const Games = () => {
    const [isLoadingComplete, setIsLoadingComplete] = useState(false);

    // Array of data for all stat modules fetched from Firestore.
    const [statModulesData, setStatModulesData] = useState<statModulesFirestoreData[]>([]);

    // Fetch data when component 'mounts' (not every time it re-renders).
    useEffect(() => {
        async function fetchData() {
            const statModuleDocuments: statModulesFirestoreData[] = await getAllStatModules();
            setStatModulesData(statModuleDocuments);

            setIsLoadingComplete(true);
        }
        fetchData();
    }, []);

    const deleteStatModule = (statModuleId: string) => {
        deleteStatModuleInFirestore(statModuleId);
        setStatModulesData(statModulesData.filter((data) => data.id !== statModuleId));
    };

    return (
        <>
            <h1 className="gap-2 text-2xl font-black">GAMES</h1>
            <p>Peruse the catalogue for games to add to your list!</p>

            {/* Stat module panes */}
            {!isLoadingComplete ? (
                <div className="lg:mt-10">
                    <LoadingGamesBar />
                </div>
            ) : (
                <div className="mb-32 mt-6 grid w-full grid-cols-[repeat(auto-fill,288px)] justify-center gap-4 text-center">
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
