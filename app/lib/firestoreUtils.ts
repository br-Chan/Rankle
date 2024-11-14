import { collection, deleteDoc, doc, DocumentData, getDoc, getDocs, orderBy, query, QuerySnapshot, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { StatModuleData } from "../ui/statModule";
import { ButtonModuleData } from "../ui/buttonModule";

/**
 * Data type for stat modules, to use when adding or fetching data from Firestore.
 */
export type statModulesFirestoreData = {
    id: string;
    gameName: string;
    inputModules: buttonModulesFirestoreData[];
    themeColor: string;
    hardModeMultiplier: number;
};

/**
 * Data type for button modules, to use when adding or fetching data from Firestore.
 */
export type buttonModulesFirestoreData = {
    id: string;
    statModuleId: string;
    queryText: string;
    buttonLabels: string[];
    buttonScores: number[];
};

export const convertStatModuleFirestoreData = (firestoreData: statModulesFirestoreData) => {
    const convertedButtonModulesData: ButtonModuleData[] = firestoreData.inputModules.map((data) => {
        return convertButtonModuleFirestoreData(data);
    })
    const convertedData: StatModuleData = {
        id: firestoreData.id,
        gameName: firestoreData.gameName,
        inputModules: convertedButtonModulesData,
        themeColor: firestoreData.themeColor,
        enabled: true,
        hardModeEnabled: false,
        hardModeMultiplier: firestoreData.hardModeMultiplier,
    }

    return convertedData;
}

export const convertButtonModuleFirestoreData = (firestoreData: buttonModulesFirestoreData) => {
    const convertedData: ButtonModuleData = {
        id: firestoreData.id,
        statModuleId: firestoreData.statModuleId,
        scoreIndex: 0,
        queryText: firestoreData.queryText,
        buttonLabels: firestoreData.buttonLabels,
        buttonScores: firestoreData.buttonScores,
        enabled: true,
        selectedButtonIndex: null
    }

    return convertedData;
}

export const addStatModuleToUser = async (userId: string, statModuleId: string) => {
    const statModuleRef = doc(db, "statModules", statModuleId);
    const statModuleSnap = await getDoc(statModuleRef);

    if (statModuleSnap.exists()) {
        const statModuleData = statModuleSnap.data();

        const userStatModuleRef = doc(db, "users", userId, "userStatModules", statModuleId);
        await setDoc(userStatModuleRef, {
            ...statModuleData,
        });

        const inputModulesRef = collection(statModuleRef, "inputModules");
        const inputModulesSnap = await getDocs(inputModulesRef);

        inputModulesSnap.forEach(async (inputModuleDoc) => {
            const userInputModuleRef = doc(db, "users", userId, "userStatModules", statModuleId, "inputModules", inputModuleDoc.id);
            await setDoc(userInputModuleRef, inputModuleDoc.data());
        });

        console.log("Stat module added!");
    } else {
        console.error("Stat module not found");
    }
}

export const removeStatModuleFromUser = async (userId: string, statModuleId: string) => {
    const userStatModuleRef = doc(db, "users", userId, "userStatModules", statModuleId);
    const userInputModulesRef = collection(userStatModuleRef, "inputModules");
    const userInputModulesSnap = await getDocs(userInputModulesRef);

    userInputModulesSnap.forEach(async (inputModuleDoc) => {
        await deleteDoc(inputModuleDoc.ref);
    });

    await deleteDoc(userStatModuleRef);

    console.log("stat module deleted!");
}

/**
 * Fetches all stat module documents in the order they were created, newest at the top left.
 *
 * @returns Firestore data of all stat modules in the statModules collection
 */
export const fetchAllStatModules = async () => {
    // Order the collection by timeStamp.
    const q = query(collection(db, "statModules"), orderBy("timeStamp", "desc"));

    const querySnapshot = await getDocs(q);
    return fetchStatModules(querySnapshot);
};

export const fetchUserStatModules = async (userId: string) => {
    const q = query(collection(db, "users", userId, "userStatModules"), orderBy("timeStamp", "asc"));

    const querySnapshot = await getDocs(q);
    return fetchStatModules(querySnapshot);
}

export const fetchStatModules = async (statModulesSnapshot: QuerySnapshot<DocumentData, DocumentData>) => {
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
}

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