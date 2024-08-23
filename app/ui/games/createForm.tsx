"use client";

import { useState } from "react";
// Firebase code in this page from this tutorial: https://www.youtube.com/watch?v=5MzCK3k3XlQ
import { db } from "@/app/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { InputModuleForm } from "./inputModuleForm";

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
    const [inputModuleForms, setInputModuleForms] = useState([<InputModuleForm />,]); // change to 2 arrays or something


    // Updates both the theme colour and the displayed name of the colour.
    const updateThemeColor = async (hexCode: string) => {
        try {
            const response = await fetch(`https://www.thecolorapi.com/id?hex=${hexCode.substring(1)}`);

            const data = await response.json();
            setThemeColorName(data.name.value);
        } catch (error) {
            console.error('Error fetching color data:', error);
        }

        setThemeColor(hexCode);
    };

    const addInputModuleForm = () => {
        setInputModuleForms([...inputModuleForms, <InputModuleForm />]);
    };

    // FIREBASE
    const handleSubmit = async (e: React.FormEvent) => {
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
        <form onSubmit={() => { }} className="p-4" > {/* handleSubmit */}
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
                        className="w-4/6 px-3 py-2 border rounded-lg outline-none bg-white bg-opacity-50 text-center text-2xl font-bold focus:border-amber-500"
                        value={gameName}
                        placeholder="Game name"
                        onChange={(e) => setGameName(e.target.value)}
                    />
                </div>

                {/* Theme color picker */}
                <div className="mb-4">
                    <div>
                        <label
                            htmlFor="themeColor"
                            className="block text-gray-700 font-mono"
                        >
                            {themeColorName}
                        </label>
                        <input
                            type="color"
                            id="themeColor"
                            className="p-1 h-10 w-14 bg-white border rounded-lg cursor-pointer focus:outline-none focus:border-amber-500"
                            value={themeColor}
                            onChange={(e) => {
                                updateThemeColor(e.target.value);
                            }}
                        />
                    </div>

                </div>

                {/* Input module creation */}
                <div className="flex flex-col justify-center text-center mb-4">
                    {inputModuleForms.map((module, index) => (
                        module
                    ))}

                    <input
                        type="button"
                        id="addInputModuleForm"
                        className="w-fit py-2 px-2 text-black font-semibold transition-colors duration-300 border-2 border-black rounded-lg"
                        onClick={addInputModuleForm}
                        value="+ Button module"
                    />


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