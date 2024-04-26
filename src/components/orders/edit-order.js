import { useParams, useNavigate } from "react-router";
import { useState, useEffect, useContext } from "react";

import { OrdersContext } from "../../store/orders-context";
import { UsersContext } from "../../store/users-context";
import OrderForm from "./order-form";

function EditOrder() {

    const { id } = useParams();
    const navigate = useNavigate();
    const { users } = useContext(UsersContext);
    const [order, setOrder] = useState({});
    const { orders, deleteOrder } = useContext(OrdersContext);

    useEffect(() => {
        setOrder(orders.find((order) => order.id === id));
    }, [orders, id]);

    const deleteOrderHandler = async () => {
        try {
            deleteOrder(id);
        } catch (error) {
            console.log('delete order error: ', error);
        } finally {
            navigate("/admin");
        }
    }

    return (
        <div className="edit-order">

            <h2 className="edit-order-title">Edit order: {order.order_number}</h2>

            <OrderForm order={order} customers={users} />

            <button className="btn btn-danger" onClick={deleteOrderHandler}>Delete</button>
        </div>
    );
}

export default EditOrder;