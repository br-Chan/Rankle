"use client";

import { useState } from "react";
// Firebase code in this page from this tutorial: https://www.youtube.com/watch?v=5MzCK3k3XlQ
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

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

export default function Home() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    // FIREBASE
    const handleSubmit = async (e: React.FormEvent) => {
        console.log("hi");
        e.preventDefault(); // prevents the default behaviour of reloading the page.
        console.log("hi");
        const added = await addDataToFirestore(name, email, message);
        if (added) {
            setName("");
            setEmail("");
            setMessage("");

            alert("YOoooo baby, you added a thingie to Firestore! How FIRE is that?");
        } else {
            alert("nooooooo...");
        }
    }

    // FIREBASE

    return (
        <main>
            <div>
                <h1 className="text-2xl mb-2">
                    Add data to Firestore database:
                </h1>
                <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg" >
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                            Name:
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-amber-500"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                            Email:
                        </label>
                        <input
                            type="text"
                            id="email"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-amber-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="message" className="block text-gray-700 font-bold mb-2">
                            Message:
                        </label>
                        <textarea
                            rows={5}
                            id="message"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-amber-500"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        ></textarea>
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
            </div>
        </main>
    )
}