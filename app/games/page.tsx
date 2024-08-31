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

            const statModuleDocuments: statModulesFirestoreData[] = [];

            // Fetch the stat module data and iterate through them.
            const statModulesSnapshot = await fetchStatModules();
            statModulesSnapshot.forEach(async (doc) => {
                // Gets all the fields and values from the stat module document's data.
                const docData = doc.data();

                const inputModuleDocuments: buttonModulesFirestoreData[] = [];

                // Fetch the input module data for this stat module and iterate through  them.
                const inputModulesSnapshot = await fetchInputModules(doc.id);
                inputModulesSnapshot.forEach((doc) => {
                    // Get all the fields and values from the input module document's data.
                    const docData = doc.data();

                    inputModuleDocuments.push({
                        statModuleId: "", // TODO docData.statModuleId 
                        queryText: docData.queryText,
                        buttonLabels: docData.buttonLabels,
                        buttonScores: docData.buttonScores,
                    })
                })

                statModuleDocuments.push({
                    id: doc.id,
                    gameName: docData.gameName,
                    inputModules: inputModuleDocuments,
                    themeColor: docData.themeColor,
                    hasHardMode: docData.hasHardMode,
                    hardModeMultiplier: docData.hardModeMultiplier,
                })
            });

            // Then create StatModuleData[] from firestoreData and also get input module firestore data
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
                    // <div key={item.id} className=" ">
                    //     <p>{item.id}</p>
                    //     <p className="font-bold">{item.gameName}</p>
                    //     <p>{item.themeColor}</p>
                    //     <p>{item.inputModules[0].queryText}</p>
                    //     <p>{item.inputModules[0].buttonLabels}</p>
                    // </div>
                    <StatModule
                    key={index}
                    data={{
                        id: item.id,
                        gameName: item.gameName,
                        inputModules: [
                            {
                                statModuleId: 'a',
                                scoreIndex: 0,
                                queryText: "Guesses made:",
                                buttonLabels: [1, 2, 3, 4, 5, 6, "X"],
                                buttonScores: [100, 90, 80, 60, 40, 20, 0],
                                enabled: true,
                            },
                        ],
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