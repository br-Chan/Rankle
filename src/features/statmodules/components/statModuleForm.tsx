"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { ButtonModuleForm } from "./buttonModuleForm";
import { StatModuleFormData } from "../types/form";
import { createStatModule } from "../api/statModulesCollection";

/**
 * The form that the user can fill in to create their stat module before submitting it and adding
 * the data to Firestore. Is visually designed to be similar to a stat module.
 *
 * @returns Create form
 */
const StatModuleForm = () => {
    const [formData, setFormData] = useState<StatModuleFormData>({
        gameName: "",
        inputModuleForms: [
            {
                queryText: "",
                data: [
                    {
                        label: "",
                        score: 0,
                    },
                    {
                        label: "",
                        score: 0,
                    },
                ],
            },
        ],
        themeColor: "#fcd34d",
        themeColorName: "Sunglow",
        hardModeMultiplier: 1,
    });

    const router = useRouter();

    /**
     * Updates both the theme colour and the displayed name of the colour.
     */
    const updateThemeColor = useDebouncedCallback(async (hexCode: string) => {
        let newThemeColorName = formData.themeColorName;
        try {
            const response = await fetch(
                `https://www.thecolorapi.com/id?hex=${hexCode.substring(1)}`
                // Removes the "#" from the hex code before concatenating with the URL
            );

            const data = await response.json();
            newThemeColorName = data.name.value;
        } catch (error) {
            console.error("Error fetching color data:", error);
        }

        setFormData((prevState) => ({
            ...prevState,
            themeColor: hexCode,
            themeColorName: newThemeColorName,
        }));
    }, 20);

    // Adding a button module
    const addInputModuleForm = () => {
        setFormData((prevState) => ({
            ...prevState,
            inputModuleForms: [
                ...prevState.inputModuleForms,
                {
                    queryText: "",
                    data: [
                        {
                            label: "",
                            score: 0,
                        },
                        {
                            label: "",
                            score: 0,
                        },
                    ],
                },
            ],
        }));
    };

    const removeInputModuleForm = () => {
        if (formData.inputModuleForms.length > 1) {
            const newInputModuleForms = formData.inputModuleForms;
            newInputModuleForms.pop();

            setFormData((prevState) => ({
                ...prevState,
                inputModuleForms: newInputModuleForms,
            }));
        }
    };

    /**
     * Adds a button form to the specified button module.
     *
     * @param buttonModuleIndex the index of inputModuleForms that contains the data set of button
     * forms that is being added to or removed from.
     * @param add true if a button form is to be added, false if the last is to be removed.
     */
    const addButtonForm = (buttonModuleIndex: number, add: boolean) => {
        // Copy the current inputModuleForms array.
        const newInputModuleForms = formData.inputModuleForms;

        if (add) {
            // Add an empty button form.
            newInputModuleForms[buttonModuleIndex].data = [
                ...newInputModuleForms[buttonModuleIndex].data,
                {
                    label: "",
                    score: 0,
                },
            ];
        } else if (newInputModuleForms[buttonModuleIndex].data.length > 2) {
            // Remove the last button form.
            newInputModuleForms[buttonModuleIndex].data.pop();
        }

        // Replace the current array with the new one.
        setFormData((prevState) => ({
            ...prevState,
            inputModuleForms: newInputModuleForms,
        }));
    };

    /**
     * Updates the inputModuleForms array with the specified field of data.
     */
    const handleButtonModuleFormChange = useDebouncedCallback(
        (
            fieldType: string,
            newValue: string | number,
            buttonModuleIndex: number,
            buttonIndex: number | null
        ) => {
            console.log(fieldType + buttonModuleIndex + buttonIndex);
            console.log(newValue);

            const newInputModuleForms = formData.inputModuleForms;

            if (fieldType === "queryText") {
                newValue = String(newValue);
                newInputModuleForms[buttonModuleIndex].queryText = newValue;
            } else if (fieldType === "label") {
                buttonIndex = Number(buttonIndex);
                newValue = String(newValue);
                newInputModuleForms[buttonModuleIndex].data[Number(buttonIndex)].label = newValue;
            } else if (fieldType === "score") {
                buttonIndex = Number(buttonIndex);
                newValue = Number(newValue);
                newInputModuleForms[buttonModuleIndex].data[Number(buttonIndex)].score = newValue;
            } else {
                alert("Error - invalid field type");
            }

            setFormData((prevState) => ({
                ...prevState,
                inputModuleForms: newInputModuleForms,
            }));
        },
        20
    );

    /**
     * Handles adding the data in the form to Firestore and informs the user if it worked.
     *
     * @param e event object when the form is submitted
     */
    const handleSubmit = async (e: React.FormEvent) => {
        // Invoke latest changes to button module forms immediately.
        handleButtonModuleFormChange.flush();

        e.preventDefault();

        console.log("Adding data to firestore...");
        const added = await createStatModule(formData);
        if (added) {
            router.push("/games");
        } else {
            alert("Something didn't work, data not added to Firestore.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full md:w-[576px]">
            <div
                className="mb-2 flex h-fit flex-col items-center gap-4 rounded-2xl border-4 px-5 py-2 text-center shadow-lg transition-bg-border duration-300"
                style={{
                    borderColor: `${formData.themeColor}`,
                    backgroundColor: `${formData.themeColor}25`,
                }}
            >
                {/* Game name input */}
                <input
                    type="text"
                    id="gameName"
                    className="w-full rounded-lg border-2 bg-white bg-opacity-50 px-3 py-2 text-center text-2xl font-bold outline-none focus:border-amber-500 md:w-4/5 dark:placeholder-gray-600"
                    value={formData.gameName}
                    placeholder="Game name"
                    autoComplete="off"
                    onChange={(e) =>
                        setFormData((prevState) => ({
                            ...prevState,
                            gameName: e.target.value,
                        }))
                    }
                    required
                />

                {/* Theme color picker */}
                <div className="flex w-full items-center justify-between space-x-2">
                    <label htmlFor="themeColor" className="flex-1 text-right font-semibold">
                        Colour:
                    </label>
                    <input
                        type="color"
                        id="themeColor"
                        className="h-10 w-14 cursor-pointer rounded-lg border-2 bg-white bg-opacity-50 p-1 focus:border-amber-500 focus:outline-none"
                        value={formData.themeColor}
                        onChange={(e) => {
                            updateThemeColor(e.target.value);
                        }}
                    />
                    <span className="flex-1 text-left font-mono text-gray-700 dark:text-gray-300">
                        &quot;{formData.themeColorName}&quot;
                    </span>
                </div>

                {/* Hard mode input */}
                <div className="flex items-center gap-1">
                    <label htmlFor="hardModeMultiplier" className="font-semibold">
                        Hard mode multiplier:
                    </label>
                    <input
                        type="number"
                        id="hardModeMultiplier"
                        className="ml-1 h-[30px] w-20 rounded-lg border-2 bg-white bg-opacity-50 px-1 py-2 pl-5 text-center text-lg text-gray-700 outline-none focus:border-amber-500 dark:text-white"
                        value={formData.hardModeMultiplier}
                        autoComplete="off"
                        min="1.0"
                        step="0.1"
                        onChange={(e) =>
                            setFormData((prevState) => ({
                                ...prevState,
                                hardModeMultiplier: parseFloat(e.target.value),
                            }))
                        }
                        onKeyDown={(e) => e.preventDefault()} // Prevents manual typing
                    />
                </div>

                {/* Input module creation */}
                <div className="flex w-full flex-col items-center text-center">
                    {formData.inputModuleForms.map((item, index) => (
                        <ButtonModuleForm
                            key={index}
                            index={index}
                            data={item.data}
                            handleAddButtonFormClick={(index, add) => addButtonForm(index, add)}
                            handleButtonModuleFormChange={(
                                fieldType,
                                newValue,
                                buttonModuleIndex,
                                buttonIndex
                            ) =>
                                handleButtonModuleFormChange(
                                    fieldType,
                                    newValue,
                                    buttonModuleIndex,
                                    buttonIndex
                                )
                            }
                        />
                    ))}
                </div>

                {/* Add/remove a button module */}
                <div className="group flex w-32 rounded-lg border-2 border-black text-sm">
                    <input
                        type="button"
                        id="addInputModuleForm"
                        className="w-1/2 cursor-pointer rounded-l-md border-r-[1px] border-amber-200 bg-amber-300 font-mono text-black transition-colors duration-300 hover:bg-amber-500"
                        onClick={addInputModuleForm}
                        value="+Query"
                    />
                    <input
                        type="button"
                        id="removeInputModuleForm"
                        className="w-1/2 cursor-pointer rounded-r-md border-l-[1px] border-amber-200 bg-amber-300 font-mono text-black transition-colors duration-300 hover:bg-amber-500"
                        onClick={removeInputModuleForm}
                        value="-Query"
                    />
                </div>
            </div>

            {/* Submit button */}
            <div className="text-center">
                <button
                    type="submit"
                    className="transition-colours rounded-lg bg-amber-300 px-4 py-2 font-bold text-black duration-300 hover:bg-amber-500 hover:text-white"
                >
                    SUBMIT
                </button>
            </div>
        </form>
    );
};

export default StatModuleForm;
