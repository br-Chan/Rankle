import { db } from "@/config/firebase";
import {
    addDoc,
    collection,
    doc,
    getDocs,
    orderBy,
    query,
    serverTimestamp,
} from "firebase/firestore";
import { StatModuleFormData } from "../types/form";
import { getStatModulesBySnapshot, deleteStatModuleByRef } from "../utils/firestoreUtils";
import { toast } from "sonner";

/**
 * Adds a stat module document to Firestore with all associated data.
 *
 * @param statModuleData the form data that is to be written to Firestore
 * @returns true if the document was successfully written to Firestore, false otherwise
 */

export const createStatModule = async (statModuleData: StatModuleFormData) => {
    try {
        // Add stat module document to statModules collection.
        const statModuleDocRef = await addDoc(collection(db, "statModules"), {
            gameName: statModuleData.gameName,
            link: statModuleData.link,
            hardModeMultiplier: statModuleData.hardModeMultiplier,
            themeColor: statModuleData.themeColor,
            timeStamp: serverTimestamp(), // The time it was created
        });

        // Add input module documents to inputModules sub-collection in the statModules collection.
        statModuleData.inputModuleForms.map(async (inputModuleFormData, i) => {
            const buttonLabels: string[] = [];
            const buttonScores: number[] = [];

            // Add all buttons' data to the arrays for labels and scores.
            inputModuleFormData.data.map((buttonFormData) => {
                buttonLabels.push(String(buttonFormData.label));
                buttonScores.push(Number(buttonFormData.score));
            });

            //Add input module document to inputModules collection.
            await addDoc(collection(statModuleDocRef, "inputModules"), {
                queryText: inputModuleFormData.queryText,
                buttonLabels: buttonLabels,
                buttonScores: buttonScores,
            });
        });

        toast.success("Successfully added game module to Rankle!");
        return true;
    } catch (error: any) {
        if (error.code === "permission-denied") {
            toast.error("You must have an account to add a game module to Rankle.");
        } else {
            toast.error("Error when adding stat module to Rankle.");
            console.log("Error when adding stat module to Rankle: ", error);
        }
        return false;
    }
};

/**
 * Fetches all stat module documents in the order they were created, newest at the top left.
 *
 * @returns Firestore data of all stat modules in the statModules collection
 */
export const getAllStatModules = async () => {
    // Order the collection by timeStamp.
    const q = query(collection(db, "statModules"), orderBy("timeStamp", "desc"));

    const querySnapshot = await getDocs(q);
    return getStatModulesBySnapshot(querySnapshot);
};

export const deleteStatModule = async (statModuleId: string) => {
    const statModuleRef = doc(db, "statModules", statModuleId);
    return await deleteStatModuleByRef(statModuleRef);
};
