import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import { UserContext } from "../../store/user-context";
import { OrdersContext } from "../../store/orders-context";

function OrderDetail() {
    const { id } = useParams();
    const { orders, deleteOrder } = useContext(OrdersContext);
    const navigate = useNavigate();
    const [order, setOrder] = useState({});
    const { isAdmin } = useContext(UserContext);

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
        <div className="order-detail">
            <h2 className="order-detail-title">Order #{order.order_number}</h2>

            <div className="order-images-container">
                {order.images.map((image) => (
                    <img key={image} className="order-image" src={image} alt="Order Image" />
                ))}
            </div>

            {isAdmin && (
                <div className="order-detail-buttons">
                    <button className="btn btn-info" onClick={() => navigate(`/orders/${id}/edit`)}>Edit</button>
                    <button className="btn btn-danger" onClick={deleteOrderHandler}>Delete</button>
                </div>
            )}
        </div>
    );
}

export default OrderDetail;