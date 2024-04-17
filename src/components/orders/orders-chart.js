
import OrderItem from "./order-item";

function OrdersChart({ orders }) {

    return (
        <div className="orders-chart">
            <h2 className="orders-chart-title">Orders</h2>

            {orders.map(order => <OrderItem key={order.id} order={order} />)}
        </div>
    );
}

export default OrdersChart;