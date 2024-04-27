import { createContext, useState, useContext, useEffect } from "react";

import { collection, getDocs, deleteDoc, addDoc } from "firebase/firestore";
import { UserContext } from "./user-context";

import { db } from "../firebase";

export const UsersContext = createContext({
    users: [],
    addUser: () => {},
    deleteUser: () => {},
});

function UsersContextProvider({ children }) {

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { isAdmin } = useContext(UserContext);

    useEffect(() => {
        const getUsers = async () => {
            try {
                if (isAdmin) {
                    const querySnapshot = await getDocs(collection(db, "users"));
                    const users = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                    setUsers(users);
                }
            } catch (error) {
                console.log(error);
                // Handle specific errors if needed
            } finally {
                setIsLoading(false);
            }
        }

        getUsers();
    }, [isAdmin]);

    const addUser = async (user) => {
        try {
            const docRef = await addDoc(collection(db, "users"), user);
            setUsers([...users, { ...user, id: docRef.id }]);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteUser = async (userId) => {
        try {
            await deleteDoc(doc(db, "users", userId));
            setUsers(users.filter((user) => user.id !== userId));
        } catch (error) {
            console.log(error);
        }
    }

    const value = {
        users,
        addUser,
        deleteUser
    }

    return (
        <UsersContext.Provider value={value}>
            {!isLoading && children}
        </UsersContext.Provider>
    );
}

export default UsersContextProvider;