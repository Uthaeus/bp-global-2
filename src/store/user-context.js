import { createContext, useState, useContext, useEffect } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { getDoc } from "firebase/firestore";

import { db } from "../firebase-config";
import { auth } from "../firebase-config";

export const UserContext = createContext({
    user: null,
    isAdmin: false,
    setUser: () => {},
    setIsAdmin: () => {}
});

function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, initializeUser);
    //     return unsubscribe;
    // }, []);

    const initializeUser = async (user) => {
        if (user) {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const userData = docSnap.data();
                setUser({id: user.uid, ...userData });
                if (userData.role === "admin") {
                    setIsAdmin(true);
                }
            }
        }

        setLoading(false);
    }

    const value = {
        user,
        isAdmin,
        setUser,
        setIsAdmin
    };

    return (
        <UserContext.Provider value={value}>
            {!loading && children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;