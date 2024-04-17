
function OrderItem({ order }) {

    return (
        <div className="order-item">
            <p className="order-item-title">{order.order_number}</p>
            <p className="order-item-date">{order.date}</p>
        </div>
    );
}

export default OrderItem;