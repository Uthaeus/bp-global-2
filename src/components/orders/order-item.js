import { Link } from "react-router-dom";
function OrderItem({ order }) {

    return (
        <Link to={`/orders/${order.id}`} className="order-item">
            <p className="order-item-order-number">{order.order_number}</p>
            <p className="order-item-date">{order.created_at}</p>
        </Link>
    );
}

export default OrderItem;