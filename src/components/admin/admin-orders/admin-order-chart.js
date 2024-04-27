
import AdminOrderChartItem from "./admin-order-chart-item";

function AdminOrderChart({ orders }) {

    return (
        <div className="admin-order-chart">
            <div className="admin-order-chart-header">
                <p className="admin-order-chart-header-item">Customer</p>
                <p className="admin-order-chart-header-item">Order Number</p>
                <p className="admin-order-chart-header-item">Created At</p>
            </div>

            <div className="admin-order-chart-body">

                {orders.map(order => <AdminOrderChartItem key={order.id} order={order} />)}
                
            </div>
        </div>
    );
}

export default AdminOrderChart