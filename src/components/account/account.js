import { useContext } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../../store/user-context";
import { OrdersContext } from "../../store/orders-context";

import OrdersChart from "../orders/orders-chart";

export default function Account() {
    const { user } = useContext(UserContext);
    const { orders } = useContext(OrdersContext);

    return (
        <div className="account">
            <div className="account-header">
                <h2 className="account-title">Account for {user.name}</h2>
                <h2 className="account-email">{user.email}</h2>
                <Link to='/account/edit' className="account-edit-link">Edit Account</Link>
            </div>

            <OrdersChart orders={orders} />
        </div>
    );
}