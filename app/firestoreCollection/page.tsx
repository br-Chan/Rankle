"use client";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useEffect, useState } from "react";

type FirestoreDocument = {
    id: string;
    [key: string]: any; // This represents any other fields in the document
};

async function fetchDataFromFirestore(collectionName: string) {
    const querySnapshot = await getDocs(collection(db, collectionName));

    const data: FirestoreDocument[] = [];
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() })
        // doc.data gets all the fields and values from the document data and puts it in the object
    });

    return data;
}

export default function Home() {
    const [messageData, setMessageData] = useState<FirestoreDocument[]>([]);
    
    const name: string = "";
    const email: string = "";
    const message: string = "";

    // run code when component 'mounts' (not every time it re-renders)
    useEffect(() => {
        async function fetchData() {
            console.log("fetching data...")
            const data: FirestoreDocument[] = await fetchDataFromFirestore("messages");
            setMessageData(data);
            // messageData.map((item) => (
            //     <div key={item.id} className="mb-4">
            //         <p className="font-bold">{item.name}</p>
            //         <p>{item.email}</p>
            //         <p>{item.message}</p>

            //         {/* <p className="font-bold">{item.gameName}</p>
            //         <p>{item.themeColor}</p>
            //         <p>{"Hard mode: " + item.hasHardMode}</p> */}
            //     </div>
            // ))
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

                        {/* <p className="font-bold">{item.gameName}</p>
                        <p>{item.themeColor}</p>
                        <p>{"Hard mode: " + item.hasHardMode}</p> */}
                    </div>
                ))}
            </div>
        </main>
    )
}