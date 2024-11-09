"use client";

import { getDocs, collection, query, orderBy } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useEffect, useState } from "react";
import { StatModulePane } from "../ui/games/statModulePane";
import { fetchStatModulesData, statModulesFirestoreData } from "../lib/firestoreUtils";

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
            const statModuleDocuments: statModulesFirestoreData[] = await fetchStatModulesData();
            setStatModulesData(statModuleDocuments);
        }
        fetchData();
    }, []);

    return (
        <main className="">
            <h1 className="gap-2 text-center text-2xl font-black">GAMES</h1>
            <p className="text-center">Add custom games or create your own!</p>
            <div
                className="
                pt-4 mb-32 grid gap-4 text-center
                grid-cols-1 w-[288px]
                md:grid-cols-2 md:w-[576px]
                lg:grid-cols-3 lg:w-[864px]
                2xl:grid-cols-4 2xl:w-[1152px]
            "
            >
                {statModulesData.map((item, index) => (
                    <StatModulePane
                        key={index}
                        data={{
                            id: item.id,
                            gameName: item.gameName,
                            inputModules: item.inputModules.map((item, index) => {
                                return {
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
                    />
                ))}
            </div>
        </main>
    );
}
