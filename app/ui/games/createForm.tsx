"use client";

import { useState } from "react";
import { db } from "@/app/firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ButtonFormData, ButtonModuleForm } from "./buttonModuleForm";
import { useDebouncedCallback } from "use-debounce";

// Firebase code in this page from this tutorial: https://www.youtube.com/watch?v=5MzCK3k3XlQ

// Data type for input module forms, to use when collecting data from the user in the Create form.
type InputModuleFormData = {
    queryText: string | null;
    data: ButtonFormData[];
};

// Adds a stat module document to Firestore with all associated data.
async function addDataToFirestore(
    gameName: string,
    themeColor: string,
    inputModuleForms: InputModuleFormData[]
) {
    try {
        // Add stat module document to statModules collection.
        const statModuleDocRef = await addDoc(collection(db, "statModules"), {
            gameName: gameName,
            hasHardMode: false, // TODO Add option to form
            hardModeMultiplier: 1, // TODO Add option to form
            themeColor: themeColor,
            timeStamp: serverTimestamp(), // The time it was created
        });
        console.log("Stat module document written with ID: ", statModuleDocRef.id);

        // Add input module documents to inputModules sub-collection in the statModules collection.
        inputModuleForms.map(async (inputModuleFormData, i) => {
            inputModuleFormData.data[i].label;
            const buttonLabels: string[] = [];
            const buttonScores: number[] = [];

            // Add all buttons' data to the arrays for labels and scores.
            inputModuleFormData.data.map((buttonFormData) => {
                buttonLabels.push(String(buttonFormData.label));
                buttonScores.push(Number(buttonFormData.score));
            });

            //Add input module document to inputModules collection.
            const inputModuleDocRef = await addDoc(collection(statModuleDocRef, "inputModules"), {
                queryText: inputModuleFormData.queryText,
                buttonLabels: buttonLabels,
                buttonScores: buttonScores,
            });
            console.log("Input module document written with ID: ", inputModuleDocRef.id);
        });

        return true;
    } catch (error) {
        console.error("Error adding document ", error);
        return false;
    }
}

// The form that the user can create their stat module with before submitting it and adding the data
// to Firestore. Is visually designed to be similar to a stat module.
export const CreateForm = () => {
    const [gameName, setGameName] = useState("");
    const [themeColor, setThemeColor] = useState("#fcd34d");
    const [themeColorName, setThemeColorName] = useState("Sunglow");

    // Array of InputModuleFormData, initialised with 2 empty ButtonFormData objects.
    const [inputModuleForms, setInputModuleForms] = useState<InputModuleFormData[]>([
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
    ]);

    // Updates both the theme colour and the displayed name of the colour.
    const updateThemeColor = useDebouncedCallback(async (hexCode: string) => {
        try {
            const response = await fetch(
                `https://www.thecolorapi.com/id?hex=${hexCode.substring(1)}`
                // Removes the "#" from the hex code before concatenating with the URL
            );

            const data = await response.json();
            setThemeColorName(data.name.value);
        } catch (error) {
            console.error("Error fetching color data:", error);
        }

        setThemeColor(hexCode);
    }, 20);

    // Adding a button module, abandoned for now
    // const addInputModuleForm = () => {
    //     setInputModuleForms([...inputModuleForms, <ButtonModuleForm queryText="" data={[{
    //         label: "",
    //         score: 0
    //     }]} />,]);
    // };

    // Adds a button form to the specified button module.
    const addButtonForm = (buttonModuleIndex: number, add: boolean) => {
        // Copy the current inputModuleForms array.
        const newInputModuleForms = [...inputModuleForms];

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
        setInputModuleForms(newInputModuleForms);
    };

    // Updates the inputModuleForms array with the specified field of data.
    const handleButtonModuleFormChange = useDebouncedCallback(
        (
            fieldType: string,
            newValue: string | number,
            buttonModuleIndex: number,
            buttonIndex: number | null
        ) => {
            console.log(fieldType + buttonModuleIndex + buttonIndex);
            console.log(newValue);

            const newInputModuleForms = [...inputModuleForms];

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
            setInputModuleForms(newInputModuleForms);
        },
        300
    );

    // Handles adding the data in the form to Firestore and informs the user if it worked.
    const handleSubmit = async (e: React.FormEvent) => {
        // Invoke latest changes to button module forms immediately.
        handleButtonModuleFormChange.flush();

        e.preventDefault(); // prevents the default behaviour of reloading the page.

        console.log("Adding data to firestore...");
        const added = await addDataToFirestore(gameName, themeColor, inputModuleForms);
        if (added) {
            alert("Success, data added to Firestore!");
        } else {
            alert("Something didn't work, data not added to Firestore.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <div
                className="mb-2 h-full py-2 px-5 text-center transition-all duration-300 border-4 rounded-2xl"
                style={{
                    borderColor: `${themeColor}`,
                    backgroundColor: `${themeColor}25`,
                }}
            >
                {/* Game name input */}
                <div className="mb-4">
                    <input
                        type="text"
                        id="gameName"
                        className="w-4/6 px-3 py-2 border-2 rounded-lg outline-none bg-white bg-opacity-50 text-center text-2xl font-bold focus:border-amber-500"
                        value={gameName}
                        placeholder="Game name"
                        onChange={(e) => setGameName(e.target.value)}
                    />
                </div>

                {/* Theme color picker */}
                <div className="mb-4">
                    <div>
                        <div className="block font-semibold">Colour:</div>
                        <label htmlFor="themeColor" className="block text-gray-700 font-mono">
                            &quot;{themeColorName}&quot;
                        </label>
                        <input
                            type="color"
                            id="themeColor"
                            className="p-1 h-10 w-14 bg-white border-2 rounded-lg cursor-pointer focus:outline-none focus:border-amber-500"
                            value={themeColor}
                            onChange={(e) => {
                                updateThemeColor(e.target.value);
                            }}
                        />
                    </div>
                </div>

                {/* Input module creation */}
                <div className="flex flex-col justify-center text-center mb-4">
                    {inputModuleForms.map((item, index) => (
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

                    {/* Adding a button module, TODO */}
                    {/* <input
                        type="button"
                        id="addInputModuleForm"
                        className="w-fit py-2 px-2 text-black font-semibold transition-colors duration-300 border-2 border-black rounded-lg cursor-pointer"
                        onClick={addInputModuleForm}
                        value="+ Button module"
                    /> */}
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
