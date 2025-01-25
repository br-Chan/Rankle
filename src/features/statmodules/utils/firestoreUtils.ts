import {
    QuerySnapshot,
    DocumentData,
    collection,
    getDocs,
    DocumentReference,
    deleteDoc,
} from "firebase/firestore";
import { statModulesFirestoreData, buttonModulesFirestoreData } from "../types/firestore";

// Firebase code from this tutorial: https://www.youtube.com/watch?v=5MzCK3k3XlQ

export const getStatModulesBySnapshot = async (
    statModulesSnap: QuerySnapshot<DocumentData, DocumentData>
) => {
    // Fetch stat module data and iterate through them to initialise statModuleDocuments.
    const statModules: statModulesFirestoreData[] = await Promise.all(
        statModulesSnap.docs.map(async (doc) => {
            const statModuleDocData = doc.data();
            const buttonModules = await getButtonModulesByRef(doc.ref);

            return {
                id: doc.id,
                gameName: statModuleDocData.gameName,
                inputModules: buttonModules,
                themeColor: statModuleDocData.themeColor,
                hardModeMultiplier: statModuleDocData.hardModeMultiplier,
            };
        })
    );

    return statModules;
};

export const getButtonModulesByRef = async (
    statModuleRef: DocumentReference<DocumentData, DocumentData>
) => {
    const inputModulesRef = collection(statModuleRef, "inputModules");
    const inputModulesSnap = await getDocs(inputModulesRef);

    const buttonModules: buttonModulesFirestoreData[] = [];
    for (const doc of inputModulesSnap.docs) {
        const docData = doc.data();
        buttonModules.push({
            id: doc.id,
            statModuleId: statModuleRef.id,
            queryText: docData.queryText,
            buttonLabels: docData.buttonLabels,
            buttonScores: docData.buttonScores,
        });
    }

    return buttonModules;
};

export const deleteStatModuleByRef = async (
    statModuleRef: DocumentReference<DocumentData, DocumentData>
) => {
    const inputModulesRef = collection(statModuleRef, "inputModules");
    const inputModulesSnap = await getDocs(inputModulesRef);
    inputModulesSnap.forEach(async (inputModuleDoc) => {
        await deleteDoc(inputModuleDoc.ref);
    });

    await deleteDoc(statModuleRef);

    console.log("stat module deleted!");
};
