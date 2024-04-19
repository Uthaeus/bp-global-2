import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

import { UserContext } from "../../store/user-context";

function OrderDetail() {
    const { id } = useParams();
    const [order, setOrder] = useState({});
    const { user, isAdmin } = useContext(UserContext);

    useEffect(() => {
        const getOrder = async () => {
            const docRef = doc(db, "orders", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setOrder({ ...docSnap.data(), id: docSnap.id });
            }
        }

        getOrder();
    }, [id]);

    return (
        <div className="order-detail">
            <h2 className="order-detail-title">Order #{order.order_number}</h2>

            {isAdmin && (
                <div className="order-detail-buttons">
                    <button className="btn btn-info">Edit</button>
                    <button className="btn btn-danger">Delete</button>
                </div>
            )}
        </div>
    );
}

export default OrderDetail;