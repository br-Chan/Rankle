"use client";

import { useState } from "react";
import { ButtonFormData, ButtonModuleForm } from "./buttonModuleForm";
import { useDebouncedCallback } from "use-debounce";
import { useRouter } from "next/navigation";
import { addDataToStatModules } from "@/app/lib/firestoreUtils";

// Firebase code in this page from this tutorial: https://www.youtube.com/watch?v=5MzCK3k3XlQ

export type StatModuleFormData = {
    gameName: string;
    inputModuleForms: InputModuleFormData[];
    themeColor: string;
    themeColorName: string;
    hardModeMultiplier: number;
};

/**
 * Data type for input module forms, to use when collecting data from the user in the Create form.
 */
type InputModuleFormData = {
    queryText: string | null;
    data: ButtonFormData[];
};

/**
 * The form that the user can fill in to create their stat module before submitting it and adding
 * the data to Firestore. Is visually designed to be similar to a stat module.
 *
 * @returns Create form
 */
export const CreateForm = () => {
    const [formData, setFormData] = useState<StatModuleFormData>({
        gameName: "",
        inputModuleForms: [
            {
                queryText: null,
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
                    queryText: null,
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

            console.log(newInputModuleForms);
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

        e.preventDefault(); // prevents the default behaviour of reloading the page.

        console.log("Adding data to firestore...");
        const added = await addDataToStatModules(formData);
        if (added) {
            router.push("/games");
        } else {
            alert("Something didn't work, data not added to Firestore.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="pt-4">
            <div
                className="flex flex-col items-center mb-2 h-full pt-2 px-5 text-center transition-all duration-300 border-4 rounded-2xl"
                style={{
                    borderColor: `${formData.themeColor}`,
                    backgroundColor: `${formData.themeColor}25`,
                }}
            >
                {/* Game name input */}
                <div className="mb-4">
                    <input
                        type="text"
                        id="gameName"
                        className="w-80 px-3 py-2 border-2 rounded-lg outline-none bg-white bg-opacity-50 text-center text-2xl font-bold focus:border-amber-500"
                        value={formData.gameName}
                        placeholder="Game name"
                        autoComplete="off"
                        onChange={(e) =>
                            setFormData((prevState) => ({
                                ...prevState,
                                gameName: e.target.value,
                            }))
                        }
                    />
                </div>

                {/* Theme color picker */}
                <div className="flex justify-between items-center w-full mb-4 space-x-2">
                    {/* <div className="flex items-center font-semibold space-x-2"> */}
                    <span className="w-60 text-right font-semibold">Colour:</span>
                    <input
                        type="color"
                        id="themeColor"
                        className="p-1 h-10 w-14 bg-white border-2 rounded-lg cursor-pointer focus:outline-none focus:border-amber-500"
                        value={formData.themeColor}
                        onChange={(e) => {
                            updateThemeColor(e.target.value);
                        }}
                    />
                    {/* </div> */}
                    <label htmlFor="themeColor" className="w-60 text-left text-gray-700 font-mono">
                        &quot;{formData.themeColorName}&quot;
                    </label>
                </div>

                {/* Hard mode input */}
                <div className="flex items-center mb-4 space-x-2">
                    <span className="font-semibold">Hard mode multiplier:</span>
                    <input
                        type="number"
                        id="hardModeMultiplier"
                        className="ml-1 h-[30px] w-20 px-1 py-2 pl-5 border-2 rounded-lg outline-none bg-white bg-opacity-50 text-center text-lg text-gray-700 focus:border-amber-500"
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
                <div className="flex flex-col w-full mb-4 items-center text-center">
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
                <div className="group flex w-32 mb-2 text-sm border-2 border-black rounded-lg">
                    <input
                        type="button"
                        id="addInputModuleForm"
                        className="w-fit border-r-[1px] border-amber-200 transition-colors duration-300 cursor-pointer"
                        onClick={addInputModuleForm}
                        value="+Query"
                    />
                    <input
                        type="button"
                        id="removeInputModuleForm"
                        className="w-fit border-l-[1px] border-amber-200 transition-colors duration-300 cursor-pointer"
                        onClick={removeInputModuleForm}
                        value="-Query"
                    />
                </div>
            </div>

            {/* Submit button */}
            <div className="text-center">
                <button
                    type="submit"
                    className="bg-amber-300 hover:bg-amber-500 text-black font-bold py-2 px-4 rounded-lg"
                >
                    SUBMIT
                </button>
            </div>
        </form>
    );
};
