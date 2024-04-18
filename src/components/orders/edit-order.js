import { useParams } from "react-router";
import { useState, useEffect } from "react";

import OrderForm from "./order-form";

function EditOrder() {

    const { id } = useParams();
    const [order, setOrder] = useState({});

    useEffect(() => {
        console.log(id);
    }, [id]);

    return (
        <div className="edit-order">

            <h2 className="edit-order-title">Edit order</h2>

            <OrderForm />
        </div>
    );
}

export default EditOrder;