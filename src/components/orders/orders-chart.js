
import OrderItem from "./order-item";

function OrdersChart({ orders }) {

    return (
        <div className="orders-chart">
            <div className="orders-chart-header">
                <h2 className="orders-chart-title">Orders</h2>
            </div>

            {orders.map(order => <OrderItem key={order.id} order={order} />)}
        </div>
    );
}

export default OrdersChart;