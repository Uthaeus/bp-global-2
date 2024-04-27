import { Link } from "react-router-dom";

function AdminOrderChartItem({ order }) {

    return (
        <Link to={`/orders/${order.id}`} className="admin-order-chart-item">
            <p className="admin-order-chart-item-title">{order.customer}</p>
            <p className="admin-order-chart-item-order_number">${order.order_number}</p>
        </Link>
    );
}

export default AdminOrderChartItem;