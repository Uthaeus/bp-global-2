import { useParams } from "react-router";
import { useState, useEffect, useContext } from "react";

import { UsersContext } from "../../store/user-context";
import { OrdersContext } from "../../store/orders-context";

function UserDetail() {

    const { id } = useParams();
    const { users } = useContext(UsersContext);
    const { orders } = useContext(OrdersContext);
    const [customer, setCustomer] = useState({});
    const [customerOrders, setCustomerOrders] = useState([]);

    useEffect(() => {
        setCustomer(users.find(user => user.id === id));
    }, [users, id]);

    useEffect(() => {
        setCustomerOrders(orders.filter(order => order.customer === customer.id));
    }, [orders, customer]);

    return (
        <div className="user-detail">

            <div className="user-detail-header">
                <h1 className="user-detail-title">{customer.name}</h1>
                <h2 className="user-detail-email">{customer.email}</h2>
            </div>

            <div className="user-detail-body">

            </div>
        </div>
    );
}

export default UserDetail;