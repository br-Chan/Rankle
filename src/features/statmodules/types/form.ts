/**
 * Data type for button forms, to use when collecting data from the user in the Create form.
 */
export type ButtonFormData = {
    label: string;
    score: number;
};

/**
 * Data type for input module forms, to use when collecting data from the user in the Create form.
 */
export type ButtonModuleFormData = {
    queryText: string;
    data: ButtonFormData[];
};

export type StatModuleFormData = {
    gameName: string;
    inputModuleForms: ButtonModuleFormData[];
    themeColor: string;
    themeColorName: string;
    hardModeMultiplier: number;
};
