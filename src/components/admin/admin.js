import { useContext, useState } from "react";
import { useNavigate } from "react-router";

import { UserContext } from "../../store/user-context";
import { UsersContext } from "../../store/users-context";

import NewOrder from "../orders/new-order";

function Admin() {
    const navigate = useNavigate();
    const [newOrder, setNewOrder] = useState(false);

    const { user } = useContext(UserContext);
    const { users } = useContext(UsersContext);

    return (
        <div className="admin">
            <div className="admin-header">
                <h1 className="admin-title">Admin for {user.name}</h1>
            </div>

            <div className="admin-content">
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