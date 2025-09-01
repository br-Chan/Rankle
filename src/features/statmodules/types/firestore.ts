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

/**
 * Data type for stat modules, to use when adding or fetching data from Firestore.
 */
export type statModulesFirestoreData = {
    id: string;
    gameName: string;
    link: string;
    inputModules: buttonModulesFirestoreData[];
    themeColor: string;
    hardModeMultiplier: number;
};
