"use client";

import { useEffect, useState } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";
import { db } from "../firebaseConfig";
import {
    addStatModuleToUser,
    fetchStatModules,
    fetchUserStatModules,
    statModulesFirestoreData,
} from "../lib/firestoreUtils";
import { StatModule } from "../ui/statModule";

export default function HomePage() {
    const { user } = useAuth();

    // Array of data for user's stat modules fetched from Firestore.
    const [statModulesData, setStatModulesData] = useState<statModulesFirestoreData[]>([]);

    // Initialize default data for new users
    useEffect(() => {
        const initializeUserData = async () => {
            if (!user) return;

            const userDocRef = doc(db, "userSelections", user.uid);
            const userDocSnap = await getDoc(userDocRef);

            if (!userDocSnap.exists()) {
                addStatModuleToUser(user.uid, "fNwVk0dhntmBWj6oAT0U");

                // // Set default data
                // const defaultData = {
                //     selections: [], // Empty selection list
                //     createdAt: new Date().toISOString(),
                // };
                // await setDoc(userDocRef, defaultData);
                // console.log("Default data initialized for new user");
            }
        };

        initializeUserData();
    }, [user]);

    // Fetch user data
    useEffect(() => {
        async function fetchData() {
            if (!user) return;
            
            const statModuleDocuments: statModulesFirestoreData[] = await fetchUserStatModules(
                user.uid
            );
            setStatModulesData(statModuleDocuments);
        }
        fetchData();
    }, [user]);

    return (
        <div>
            <h1>My Home Page</h1>
            {statModulesData.map((item, index) => (
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
            ))}
        </div>
    );
}
