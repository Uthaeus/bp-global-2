import { useContext, useState } from "react";
import { useNavigate } from "react-router";

import { UserContext } from "../../store/user-context";
import { UsersContext } from "../../store/users-context";
import { OrdersContext } from "../../store/orders-context";

import NewOrder from "../orders/new-order";

import AdminOrderChart from "./admin-orders/admin-order-chart";

function Admin() {
    const navigate = useNavigate();
    const [ adminContent, setAdminContent ] = useState('');

    const { user } = useContext(UserContext);
    const { users } = useContext(UsersContext);
    const { orders } = useContext(OrdersContext);

    return (
        <div className="admin">
            <div className="admin-menu">
                <p className="admin-menu-item" onClick={() => setAdminContent('')}>Admin Home</p>
                <p className="admin-menu-item" onClick={() => setAdminContent('orders')}>All Orders</p>
                <p className="admin-menu-item" onClick={() => setAdminContent('users')}>All Users</p>
                <p className="admin-menu-item" onClick={navigate('/account/edit')}>Edit Account</p>
            </div>

            <div className="admin-body">
                <div className="admin-header">
                    <h1 className="admin-title">Admin for {user.name}</h1>
                </div>

                <div className="admin-content">


                </div>
                
                {!newOrder && (
                    <button className="btn btn-primary admin-button" onClick={() => setNewOrder(true)}>Create new order</button>
                )}

                {newOrder && (
                    <>
                        <NewOrder customers={users} />

                        <button className="btn btn-danger admin-button" onClick={() => setNewOrder(false)}>Close</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Admin;