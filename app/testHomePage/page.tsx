"use client";

import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";
import { db } from "../firebaseConfig";
import {
    addStatModuleToUser,
    fetchUserStatModules,
    statModulesFirestoreData,
} from "../lib/firestoreUtils";
import { StatModule } from "../ui/statModule";

export default function HomePage() {
    const { user } = useAuth();

    // Array of data for user's stat modules fetched from Firestore.
    const [statModulesData, setStatModulesData] = useState<statModulesFirestoreData[]>([]);

    // Fetch user data, initialising default data first if new user.
    useEffect(() => {
        async function fetchUserData() {
            if (user) {
                const userStatModulesCollectionRef = collection(db, "users", user.uid, "userStatModules");
                const userStatModulesSnap = await getDocs(userStatModulesCollectionRef);

                if (userStatModulesSnap.empty) {
                    console.log("adding stat modules to user");
                    await Promise.all([
                        addStatModuleToUser(user.uid, "fNwVk0dhntmBWj6oAT0U"),
                        addStatModuleToUser(user.uid, "gzF6eumgBN9QiVF1LxM4"),
                        addStatModuleToUser(user.uid, "ZNWNu2GzygcgvcqrcPxf"),
                        addStatModuleToUser(user.uid, "SHP4lWxnM5ONQJpRK5sH"),
                        addStatModuleToUser(user.uid, "fNwVk0dhntmBWj6oAT0U"),
                        addStatModuleToUser(user.uid, "ZyUFFw9Cdwix8w4UvW9O"),
                    ]);
                }

                const statModuleDocuments: statModulesFirestoreData[] = await fetchUserStatModules(
                    user.uid
                );
                setStatModulesData(statModuleDocuments);
            } else {
                console.log("User data doesn't exist yet.");
            }
        }
        fetchUserData();
    }, [user]);

    return (
        <div>
            <h1>My Home Page</h1>
            {statModulesData.length === 0 ? (
                <p>Loading your games...</p>
            ) : (
                statModulesData.map((item, index) => (
                    <StatModule
                        key={index}
                        data={{
                            id: item.id,
                            gameName: item.gameName,
                            inputModules: item.inputModules.map((item, index) => {
                                return {
                                    statModuleId: item.statModuleId,
                                    scoreIndex: index,
                                    queryText: item.queryText,
                                    buttonLabels: item.buttonLabels,
                                    buttonScores: item.buttonScores,
                                    enabled: true,
                                    selectedButtonIndex: null,
                                };
                            }),
                            themeColor: item.themeColor,
                            enabled: true,
                            hardModeEnabled: false,
                            hardModeMultiplier: item.hardModeMultiplier,
                        }}
                        handleEnableClick={function (statModuleId: string): void {
                            throw new Error("Function not implemented.");
                        }}
                        handleHardModeClick={function (statModuleId: string): void {
                            throw new Error("Function not implemented.");
                        }}
                        handleInputClick={function (
                            index: number,
                            scoreIndex: number,
                            score: number
                        ): void {
                            throw new Error("Function not implemented.");
                        }}
                    />
                ))
            )}
        </div>
    );
}
