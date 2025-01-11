"use client";

import { useEffect, useState } from "react";
import { StatModulePane } from "../ui/games/statModulePane";
import {
    fetchAllStatModules,
    statModulesFirestoreData,
    removeStatModuleFromStatModules as removeStatModuleFromStatModulesInFirestore,
} from "../lib/firestoreUtils";

/**
 * Page where users can view user-created stat modules and add them to their own lists.
 *
 * @returns Games page
 */
export default function Home() {
    // Array of data for all stat modules fetched from Firestore.
    const [statModulesData, setStatModulesData] = useState<statModulesFirestoreData[]>([]);

    // Fetch data when component 'mounts' (not every time it re-renders).
    useEffect(() => {
        async function fetchData() {
            const statModuleDocuments: statModulesFirestoreData[] = await fetchAllStatModules();
            setStatModulesData(statModuleDocuments);
        }
        fetchData();
    }, []);

    const removeStatModuleFromStatModules = (statModuleId: string) => {
        removeStatModuleFromStatModulesInFirestore(statModuleId);
        setStatModulesData(statModulesData.filter((data) => data.id !== statModuleId));
    };

    return (
        <main className="">
            <h1 className="gap-2 text-center text-2xl font-black">GAMES</h1>
            <p className="mb-2 text-center">Peruse the catalogue for games to add to your list!</p>

            {/* Stat module panes */}
            {statModulesData.length === 0 ? (
                <p className="flex flex-col rounded-xl bg-amber-300 px-16 py-1 text-center font-mono text-2xl text-black lg:mt-10 lg:flex-row">
                    <span>Loading all games</span>
                    <span>...</span>
                </p>
            ) : (
                <div className="mb-32 grid w-[288px] grid-cols-1 gap-4 pt-4 text-center md:w-[576px] md:grid-cols-2 lg:w-[864px] lg:grid-cols-3 2xl:w-[1152px] 2xl:grid-cols-4">
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
                            removeStatModuleFromStatModules={removeStatModuleFromStatModules}
                        />
                    ))}
                </div>
            )}
        </main>
    );
}
