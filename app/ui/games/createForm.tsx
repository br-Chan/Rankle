"use client";

import { useState } from "react";
// Firebase code in this page from this tutorial: https://www.youtube.com/watch?v=5MzCK3k3XlQ
import { db } from "@/app/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { ButtonFormData, ButtonModuleForm } from "./buttonModuleForm";
import { useDebouncedCallback } from "use-debounce";

type InputModuleFormData = {
    queryText: string | null;
    data: ButtonFormData[];
}

async function addDataToFirestore(name: string, themeColor: string,) {
    try {
        const docRef = await addDoc(collection(db, "messages"), {
            name: name,
            themeColor: themeColor,
        });
        console.log("Document written with ID: ", docRef.id);
        return true;
    } catch (error) {
        console.error("Error adding document ", error);
        return false;
    }
}

export const CreateForm = () => {
    const [gameName, setGameName] = useState("");
    const [themeColor, setThemeColor] = useState("#fcd34d");
    const [themeColorName, setThemeColorName] = useState("Sunglow");

    // Array of object literal containing the 'data' field, which is an array of ButtonFormData's.
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
            const response = await fetch(`https://www.thecolorapi.com/id?hex=${hexCode.substring(1)}`);

            const data = await response.json();
            setThemeColorName(data.name.value);
        } catch (error) {
            console.error('Error fetching color data:', error);
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

    // Adds a button to the specified button module.
    const addButtonForm = (buttonModuleIndex: number, add: boolean) => {
        // Copy the current inputModuleForms array.
        const newInputModuleForms = [...inputModuleForms];

        if (add) { // Add a button
            newInputModuleForms[buttonModuleIndex].data = [
                ...newInputModuleForms[buttonModuleIndex].data,
                {
                    label: "",
                    score: 0,
                },
            ]
        } else if (newInputModuleForms[buttonModuleIndex].data.length > 2) { // Remove a button
            newInputModuleForms[buttonModuleIndex].data.pop();
        }

        // Replace the current array with the new one.
        setInputModuleForms(newInputModuleForms);
    }

    const handleButtonModuleFormChange = useDebouncedCallback((
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

        console.log(newInputModuleForms)
        setInputModuleForms(newInputModuleForms);

    }, 300);

    // FIREBASE
    const handleSubmit = async (e: React.FormEvent) => {
        // debouncedCallback.flush();
        // TODO do this so latest thing is invoked immediately

        console.log("hi");
        e.preventDefault(); // prevents the default behaviour of reloading the page.
        console.log("hi");
        const added = await addDataToFirestore(gameName, themeColor);
        if (added) {
            setGameName("");

            alert("YOoooo baby, you added a thingie to Firestore! How FIRE is that?");
        } else {
            alert("nooooooo...");
        }
    }

    // FIREBASE

    return (
        // Main form for stat module creation
        <form onSubmit={() => { console.log("I have been pressed!") }} className="p-4" > {/* handleSubmit */}
            {/* Stat module form */}
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
                        <label
                            htmlFor="themeColor"
                            className="block text-gray-700 font-mono"
                        >
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
                            ) => handleButtonModuleFormChange(fieldType, newValue, buttonModuleIndex, buttonIndex)}
                        />
                    ))}

                    {/* Adding a button module, abandoned for now */}
                    {/* <input
                        type="button"
                        id="addInputModuleForm"
                        className="w-fit py-2 px-2 text-black font-semibold transition-colors duration-300 border-2 border-black rounded-lg cursor-pointer"
                        onClick={addInputModuleForm}
                        value="+ Button module"
                    /> */}


                </div>
            </div>
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
}