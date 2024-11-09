"use client";

import { useEffect, useState } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";
import { db } from "../firebaseConfig";
import { addStatModuleToUser } from "../lib/firestoreUtils";

export default function HomePage() {
  const { user } = useAuth();
  const [catalog, setCatalog] = useState<any[]>([]);

  // Initialize default data for new users
  useEffect(() => {
    const initializeUserData = async () => {
      if (!user) return;

      const userDocRef = doc(db, "userSelections", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        addStatModuleToUser(user.uid, "fNwVk0dhntmBWj6oAT0U");

        // Set default data
        const defaultData = {
          selections: [], // Empty selection list
          createdAt: new Date().toISOString(),
        };
        await setDoc(userDocRef, defaultData);
        console.log("Default data initialized for new user");
      }
    };

    initializeUserData();
  }, [user]);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        setCatalog(userDocSnap.data().selections || []);
      }
    };

    fetchUserData();
  }, [user]);

  return (
    <div>
      <h1>My Home Page</h1>
      {catalog.length === 0 ? (
        <p>No items selected yet!</p>
      ) : (
        catalog.map((item: any, index: number) => (
          <div key={index}>
            <p>{item}</p>
          </div>
        ))
      )}
    </div>
  );
}
