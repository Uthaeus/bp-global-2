import { useContext } from "react";

import { UserContext } from "../../store/user-context";
import { OrdersContext } from "../../store/orders-context";

import OrdersChart from "../orders/orders-chart";

export default function Account() {
    const { user } = useContext(UserContext);
    const { orders } = useContext(OrdersContext);

    return (
        <div className="account">
            <h2 className="account-title">Account for {user.name}</h2>

            <OrdersChart orders={orders} />
        </div>
    );
}