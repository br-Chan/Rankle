"use client";

import { useState } from "react";
// Firebase code in this page from this tutorial: https://www.youtube.com/watch?v=5MzCK3k3XlQ
import { db } from "@/app/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

async function addDataToFirestore(name: string, email: string, message: string) {
    try {
        const docRef = await addDoc(collection(db, "messages"), {
            name: name,
            email: email,
            message: message,
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
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

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
    }

    // FIREBASE
    const handleSubmit = async (e: React.FormEvent) => {
        console.log("hi");
        e.preventDefault(); // prevents the default behaviour of reloading the page.
        console.log("hi");
        const added = await addDataToFirestore(gameName, email, message);
        if (added) {
            setGameName("");
            setEmail("");
            setMessage("");

            alert("YOoooo baby, you added a thingie to Firestore! How FIRE is that?");
        } else {
            alert("nooooooo...");
        }
    }

    // FIREBASE

    return (
        <form onSubmit={handleSubmit} className="p-4" >
            <div
                className="mb-2 h-full py-2 px-5 text-center transition-all duration-300 border-4 rounded-2xl"
                style={{
                    borderColor: `${themeColor}`,
                    backgroundColor: `${themeColor}25`,
                }}
            >
                <div className="mb-4">
                    <input
                        type="text"
                        id="gameName"
                        className="w-4/6 px-3 py-2 border rounded-lg text-center text-2xl font-bold focus:outline-none focus:border-amber-500"
                        value={gameName}
                        placeholder="Game name"
                        onChange={(e) => setGameName(e.target.value)}
                    />
                </div>
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
                <div className="mb-4">
                    <label htmlFor="message" className="block text-gray-700 font-bold mb-2">
                        Message
                    </label>
                    <textarea
                        rows={5}
                        id="message"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-amber-500"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
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