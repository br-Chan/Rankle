import { ButtonModuleData, StatModuleData } from "../types/display";
import { buttonModulesFirestoreData, statModulesFirestoreData } from "../types/firestore";

export const convertStatModuleFirestoreData = (firestoreData: statModulesFirestoreData) => {
    const convertedButtonModulesData: ButtonModuleData[] = firestoreData.inputModules.map(
        (data) => {
            return convertButtonModuleFirestoreData(data);
        }
    );
    const convertedData: StatModuleData = {
        id: firestoreData.id,
        gameName: firestoreData.gameName,
        link: firestoreData.link,
        inputModules: convertedButtonModulesData,
        themeColor: firestoreData.themeColor,
        enabled: true,
        hardModeEnabled: false,
        hardModeMultiplier: firestoreData.hardModeMultiplier,
    };

    return convertedData;
};

export const convertButtonModuleFirestoreData = (firestoreData: buttonModulesFirestoreData) => {
    const convertedData: ButtonModuleData = {
        id: firestoreData.id,
        statModuleId: firestoreData.statModuleId,
        scoreIndex: 0,
        queryText: firestoreData.queryText,
        buttonLabels: firestoreData.buttonLabels,
        buttonScores: firestoreData.buttonScores,
        enabled: true,
        selectedButtonIndex: null,
    };

    return convertedData;
};
