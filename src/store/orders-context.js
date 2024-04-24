import { useState, useEffect, useContext, createContext } from "react";

import { getDocs, collection, query, where, addDoc, deleteDoc } from "firebase/firestore";

import { db } from "../firebase";

import { UserContext } from "../store/user-context";

export const OrdersContext = createContext({
    orders: [],
    addOrder: () => {},
    deleteOrder: () => {},
});

function OrdersContextProvider({ children }) {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { user, isAdmin } = useContext(UserContext);

    useEffect(() => {
        const getOrders = async () => {
            try {
                let q;

                if (isAdmin) {
                    q = query(collection(db, "orders"));
                } else {
                    q = query(collection(db, "orders"), where("user", "==", customer.id));
                }
                
                const querySnapshot = await getDocs(q);

                const orders = [];

                querySnapshot.forEach((doc) => {
                    orders.push({ ...doc.data(), id: doc.id });
                });

                setOrders(orders);
            }
            catch (error) {
                console.log(error);
            }
        }

        if (user) {
            getOrders();
        }

        setIsLoading(false);
    }, [user, isAdmin]);

    const addOrder = async (order) => {
        try {
            const docRef = await addDoc(collection(db, "orders"), order);
            setOrders([...orders, { ...order, id: docRef.id }]);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteOrder = async (orderId) => {
        try {
            await deleteDoc(doc(db, "orders", orderId));
            setOrders(orders.filter((order) => order.id !== orderId));
        } catch (error) {
            console.log(error);
        }
    }

    const value = {
        orders,
        addOrder,
        deleteOrder
    }

    return (
        <OrdersContext.Provider value={value}>{!isLoading && children}</OrdersContext.Provider>
    )
}

export default OrdersContextProvider;