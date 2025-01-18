import {
    QuerySnapshot,
    DocumentData,
    collection,
    getDocs,
    CollectionReference,
    DocumentReference,
    deleteDoc,
} from "firebase/firestore";
import { statModulesFirestoreData, buttonModulesFirestoreData } from "../types/firestore";
import { db } from "@/config/firebase";

export const fetchStatModules = async (
    statModulesSnapshot: QuerySnapshot<DocumentData, DocumentData>
) => {
    console.log("Fetching data...");

    // Fetch stat module data and iterate through them to initialise statModuleDocuments.
    // const statModulesSnapshot = await fetchStatModules();
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
                        id: inputDoc.id,
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

    return statModuleDocuments;
};

/**
 * Fetches the input module documents of the stat module associated with the input ID.
 *
 * @param statModuleId id of the stat module to search for
 * @returns query snapshot of searching for the documents in the inputModules collection of the stat
 * module
 */
export const fetchInputModules = async (statModuleId: string) => {
    const querySnapshot = await getDocs(
        collection(db, "statModules", statModuleId, "inputModules")
    );
    return querySnapshot;
};

export const removeStatModule = async (
    statModuleRef: DocumentReference<DocumentData, DocumentData>,
    inputModulesRef: CollectionReference<DocumentData, DocumentData>
) => {
    const inputModulesSnap = await getDocs(inputModulesRef);
    inputModulesSnap.forEach(async (inputModuleDoc) => {
        await deleteDoc(inputModuleDoc.ref);
    });

    await deleteDoc(statModuleRef);

    console.log("stat module deleted!");
};
