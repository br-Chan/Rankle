import { db } from "@/config/firebase";
import { doc, getDoc, setDoc, collection, getDocs, orderBy, query } from "firebase/firestore";
import { getStatModulesBySnapshot, deleteStatModuleByRef } from "../utils/firestoreUtils";

export const addUserStatModule = async (userId: string, statModuleId: string) => {
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

export const getUserStatModules = async (userId: string) => {
    const q = query(
        collection(db, "users", userId, "userStatModules"),
        orderBy("timeStamp", "asc")
    );

    const querySnapshot = await getDocs(q);
    return getStatModulesBySnapshot(querySnapshot);
};

export const deleteUserStatModule = async (userId: string, statModuleId: string) => {
    const userStatModuleRef = doc(db, "users", userId, "userStatModules", statModuleId);
    deleteStatModuleByRef(userStatModuleRef);
};
