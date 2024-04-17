import { createContext, useState, useContext, useEffect } from "react";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";

import { db } from "../firebase";
import { auth } from "../firebase";

export const UserContext = createContext({
    user: null,
    isAdmin: false,
    setUser: () => {},
    setIsAdmin: () => {},
    logOutUser: () => {},
});

function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return unsubscribe;
    }, []);

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
        } else {
            setUser(null);
            setIsAdmin(false);
        }

        setLoading(false);
    }

    const logOutUser = async () => {
        try {
            await signOut(auth);
            setUser(null);
            setIsAdmin(false);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const value = {
        user,
        isAdmin,
        setUser,
        setIsAdmin,
        logOutUser
    };

    return (
        <UserContext.Provider value={value}>
            {!loading && children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;