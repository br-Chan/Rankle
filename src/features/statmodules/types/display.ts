"use client";

/**
 * Data type for stat modules when displaying them to the user.
 */
export type StatModuleData = {
    id: string;
    gameName: string;
    inputModules: ButtonModuleData[];
    themeColor: string;
    enabled: boolean;
    hardModeEnabled: boolean;
    hardModeMultiplier: number;
}; /**
 * Data type for button modules, to be used when displaying a stat module to the user.
 */

export type ButtonModuleData = {
    id: string;
    statModuleId: string;
    scoreIndex: number;
    queryText: string;
    buttonLabels: (number | string)[];
    buttonScores: number[];
    enabled: boolean;
    selectedButtonIndex: number | null;
};


