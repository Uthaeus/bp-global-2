import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

function OrderDetail() {
    const { id } = useParams();
    const [order, setOrder] = useState({});

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
        </div>
    );
}

export default OrderDetail;