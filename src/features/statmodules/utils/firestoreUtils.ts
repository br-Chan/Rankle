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

export const getStatModulesBySnapshot = async (
    statModulesSnapshot: QuerySnapshot<DocumentData, DocumentData>
) => {
    console.log("Getting stat modules...");

    // Fetch stat module data and iterate through them to initialise statModuleDocuments.
    const statModuleDocuments: statModulesFirestoreData[] = await Promise.all(
        statModulesSnapshot.docs.map(async (doc) => {
            // Get all fields and values from stat module document's data.
            const statModuleDocData = doc.data();

            // Fetch input module data for this stat module and iterate through them to
            // initialise inputModuleDocuments.
            const buttonModuleDocuments = await getButtonModulesById(doc.id);

            return {
                id: doc.id,
                gameName: statModuleDocData.gameName,
                inputModules: buttonModuleDocuments,
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
export const getButtonModulesById = async (statModuleId: string) => {
    const querySnapshot = await getDocs(
        collection(db, "statModules", statModuleId, "inputModules")
    );

    const buttonModuleDocuments: buttonModulesFirestoreData[] = [];

    for (const doc of querySnapshot.docs) {
        const docData = doc.data();
        buttonModuleDocuments.push({
            id: doc.id,
            statModuleId: statModuleId,
            queryText: docData.queryText,
            buttonLabels: docData.buttonLabels,
            buttonScores: docData.buttonScores,
        });
    }

    return buttonModuleDocuments;
};

export const deleteStatModuleByRef = async (
    statModuleRef: DocumentReference<DocumentData, DocumentData>,
    // inputModulesRef: CollectionReference<DocumentData, DocumentData>
) => {
    const inputModulesRef = collection(statModuleRef, "inputModules");
    const inputModulesSnap = await getDocs(inputModulesRef);
    inputModulesSnap.forEach(async (inputModuleDoc) => {
        await deleteDoc(inputModuleDoc.ref);
    });

    await deleteDoc(statModuleRef);

    console.log("stat module deleted!");
};
