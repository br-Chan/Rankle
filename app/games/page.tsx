"use client";

import { getDocs, collection, DocumentReference, DocumentData, CollectionReference } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useEffect, useState } from "react";
import { StatModule } from "../ui/statModule";

type statModulesFirestoreData = {
    id: string;
    gameName: string;
    inputModules: buttonModulesFirestoreData[];
    themeColor: string;
    hasHardMode: boolean;
    hardModeMultiplier: number;
}

type buttonModulesFirestoreData = {
    statModuleId: string;
    queryText: string;
    buttonLabels: string[];
    buttonScores: number[];
}

const fetchStatModules = async () => {
    const querySnapshot = await getDocs(collection(db, "statModules"));
    return querySnapshot;
}

const fetchInputModules = async (statModuleId: string) => {
    const querySnapshot = await getDocs(collection(db, "statModules", statModuleId, "inputModules"));
    return querySnapshot;
}

export default function Home() {
    const [statModulesData, setStatModulesData] = useState<statModulesFirestoreData[]>([]);

    // run code when component 'mounts' (not every time it re-renders)
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
                        hasHardMode: statModuleDocData.hasHardMode,
                        hardModeMultiplier: statModuleDocData.hardModeMultiplier,
                    }
                })
            );

    setStatModulesData(statModuleDocuments);
}
fetchData();

    }, []);

return (
    <main className="">
        <h1 className="gap-2 text-center text-2xl font-black">
            GAMES
        </h1>
        <p className="text-center">Add custom games or create your own!</p>
        <div className="
                mb-32 grid gap-4 text-center
                grid-cols-1 w-[288px]
                md:grid-cols-2 md:w-[576px]
                lg:grid-cols-3 lg:w-[864px]
                2xl:grid-cols-4 2xl:w-[1152px]
            ">
            {statModulesData.map((item, index) => (
                <StatModule
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
                            }                           
                        }),
                        // [
                        //     {
                        //         statModuleId: 'a',
                        //         scoreIndex: 0,
                        //         queryText: "Guesses made:",
                        //         buttonLabels: [1, 2, 3, 4, 5, 6, "X"],
                        //         buttonScores: [100, 90, 80, 60, 40, 20, 0],
                        //         enabled: true,
                        //     },
                        // ],
                        themeColor: item.themeColor,
                        enabled: true,
                        hasHardMode: item.hasHardMode,
                        hardModeEnabled: false,
                        hardModeMultiplier: item.hardModeMultiplier,
                    }}
                    handleEnableClick={() => { }}
                    handleHardModeClick={() => { }}
                    handleInputClick={() => { }} />
            ))}
        </div>
    </main>
);
}