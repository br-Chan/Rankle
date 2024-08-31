"use client";

import { getDocs, collection, DocumentReference, DocumentData } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useEffect, useState } from "react";

type FirestoreDocument = { // just make this a stat module data
    id: string;
    [key: string]: any; // This represents any other fields in the document
};

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
    buttonLabels: (number | string)[];
    buttonScores: number[];
}

const fetchStatModules = async () => {
    const querySnapshot = await getDocs(collection(db, "statModules"));
    return querySnapshot;
}

const fetchInputModules = async (statModuleDocRef: DocumentReference<DocumentData, DocumentData>) => {
    const querySnapshot = await getDocs(collection(statModuleDocRef, "inputModules"));
    return querySnapshot;
}

async function fetchDataFromFirestore(collectionName: string) {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot;

}

export default function Home() {
    const [statModulesData, setStatModulesData] = useState<statModulesFirestoreData[]>([]);

    // run code when component 'mounts' (not every time it re-renders)
    useEffect(() => {
        async function fetchData() {
            console.log("Fetching data...");

            const statModulesSnapshot = await fetchStatModules();

            const statModuleDocuments: statModulesFirestoreData[] = [];
            statModulesSnapshot.forEach((doc) => {
                const docData = doc.data();
                statModuleDocuments.push({
                    id: doc.id,
                    gameName: docData.gameName,
                    inputModules: [],
                    themeColor: docData.themeColor,
                    hasHardMode: docData.hasHardMode,
                    hardModeMultiplier: docData.hardModeMultiplier,
                })
                // doc.data gets all the fields and values from the document data and puts it in the object
            });



            // const inputModulesSnapshot = await fetchInputModules();

            // Then create StatModuleData[] from firestoreData and also get input module firestore data
            setStatModulesData(statModuleDocuments);
        }
        fetchData();

    }, []);

    return (
        <main className="flex flex-col justify-center w-[288px] md:w-[576px] text-center">
            <h1 className="gap-2 text-center text-2xl font-black">
                GAMES
            </h1>
            <p>Add custom games or create your own!</p>
            <div>
                {statModulesData.map((item) => (
                    <div key={item.id} className="mb-4">
                        <p className="font-bold">{item.gameName}</p>
                        <p>{item.themeColor}</p>
                        <p>hardModeMultiplier: {item.hardModeMultiplier}</p>
                    </div>
                ))}
            </div>
        </main>
    );
}