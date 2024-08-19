"use client";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useEffect, useState } from "react";

type FirestoreDocument = {
    id: string;
    [key: string]: any; // This represents any other fields in the document
};

async function fetchDataFromFirestore() {
    const querySnapshot = await getDocs(collection(db, "messages"));

    const data: FirestoreDocument[] = [];
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() })
        // doc.data gets all the fields and values from the document data and puts it in the object
    });

    return data;
}

export default function Home() {
    const [messageData, setMessageData] = useState<FirestoreDocument[]>([]);

    // run code when component 'mounts' (not every time it re-renders)
    useEffect(() => {
        async function fetchData() {
            const data: FirestoreDocument[] = await fetchDataFromFirestore();
            setMessageData(data);
        }
        fetchData();

    }, []);

    return (
        <main className="flex min-h screen flex-col itmes-center justify-between p-24">
            <div>
                <h1 className="text-2xl mb-2">
                    Fetch data from Firestore database:
                </h1>
            </div>
            <div>
                {messageData.map((item) => (
                    <div key={item.id} className="mb-4">
                        <p className="font-bold">{item.name}</p>
                        <p>{item.email}</p>
                        <p>{item.message}</p>
                    </div>
                ))}
            </div>
        </main>
    )
}