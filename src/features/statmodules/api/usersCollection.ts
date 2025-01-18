import { db } from "@/config/firebase";
import { doc, getDoc, setDoc, collection, getDocs, orderBy, query } from "firebase/firestore";
import { fetchStatModules, removeStatModule } from "../utils/firestoreUtils";

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
            const userInputModuleRef = doc(
                db,
                "users",
                userId,
                "userStatModules",
                statModuleId,
                "inputModules",
                inputModuleDoc.id
            );
            await setDoc(userInputModuleRef, inputModuleDoc.data());
        });

        console.log("Stat module added!");
    } else {
        console.error("Stat module not found");
    }
};

export const removeStatModuleFromUser = async (userId: string, statModuleId: string) => {
    const userStatModuleRef = doc(db, "users", userId, "userStatModules", statModuleId);
    const userInputModulesRef = collection(userStatModuleRef, "inputModules");
    removeStatModule(userStatModuleRef, userInputModulesRef);
};

export const fetchUserStatModules = async (userId: string) => {
    const q = query(
        collection(db, "users", userId, "userStatModules"),
        orderBy("timeStamp", "asc")
    );

    const querySnapshot = await getDocs(q);
    return fetchStatModules(querySnapshot);
};
