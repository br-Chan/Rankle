"use client";

import { getDocs, collection, query, orderBy } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useEffect, useState } from "react";
import { StatModulePane } from "../ui/games/statModulePane";

/**
 * Data type for stat modules, to use when adding or fetching data from Firestore.
 */
type statModulesFirestoreData = {
    id: string;
    gameName: string;
    inputModules: buttonModulesFirestoreData[];
    themeColor: string;
    hardModeMultiplier: number;
};

/**
 * Data type for button modules, to use when adding or fetching data from Firestore.
 */
type buttonModulesFirestoreData = {
    statModuleId: string;
    queryText: string;
    buttonLabels: string[];
    buttonScores: number[];
};

/**
 * Fetches all stat module documents in the order they were created, newest at the top left.
 *
 * @returns query snapshot of searching for the documents in the statModules collection
 */
const fetchStatModules = async () => {
    // Order the collection by timeStamp.
    const q = query(collection(db, "statModules"), orderBy("timeStamp", "desc"));

    const querySnapshot = await getDocs(q);
    return querySnapshot;
};

/**
 * Fetches the input module documents of the stat module associated with the input ID.
 *
 * @param statModuleId id of the stat module to search for
 * @returns query snapshot of searching for the documents in the inputModules collection of the stat
 * module
 */
const fetchInputModules = async (statModuleId: string) => {
    const querySnapshot = await getDocs(
        collection(db, "statModules", statModuleId, "inputModules")
    );
    return querySnapshot;
};

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
            console.log("Fetching data...");

            // Fetch stat module data and iterate through them to initialise statModuleDocuments.
            const statModulesSnapshot = await fetchStatModules();
            const statModuleDocuments: statModulesFirestoreData[] = await Promise.all(
                statModulesSnapshot.docs.map(async (doc) => {
                    // Get all fields and values from stat module document's data.
                    const statModuleDocData = doc.data();

                    // Fetch input module data for this stat module and iterate through them to
                    // initialise inputModuleDocuments.
                    const inputModulesSnapshot = await fetchInputModules(doc.id);
                    const inputModuleDocuments: buttonModulesFirestoreData[] =
                        inputModulesSnapshot.docs.map((inputDoc) => {
                            // Get all fields and values from input module document's data.
                            const inputModuleDocData = inputDoc.data();

                            return {
                                statModuleId: doc.id,
                                queryText: inputModuleDocData.queryText,
                                buttonLabels: inputModuleDocData.buttonLabels,
                                buttonScores: inputModuleDocData.buttonScores,
                            };
                        });

                    return {
                        id: doc.id,
                        gameName: statModuleDocData.gameName,
                        inputModules: inputModuleDocuments,
                        themeColor: statModuleDocData.themeColor,
                        hardModeMultiplier: statModuleDocData.hardModeMultiplier,
                    };
                })
            );

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
                mb-32 grid gap-4 text-center
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
