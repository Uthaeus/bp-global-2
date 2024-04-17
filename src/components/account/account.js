import { useContext, useState, useEffect } from "react";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../../firebase";

import { UserContext } from "../../store/user-context";

import OrdersChart from "../orders/orders-chart";

export default function Account() {
    const { user } = useContext(UserContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrders = async (userId) => {
            try {
                const q = query(collection(db, "orders"), where("userId", "==", user.id));
                const querySnapshot = await getDocs(q);
                const orders = [];

                querySnapshot.forEach((doc) => {
                    orders.push({ ...doc.data(), id: doc.id });
                });

                setOrders(orders);
            } catch (error) {
                console.log(error);
            }
        }

        getOrders(user.id);
    }, [ user ]);

    return (
        <div className="account">
            <h2 className="account-title">Account for {user.email}</h2>

            <OrdersChart orders={orders} />
        </div>
    );
}