import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { getDocs, collection, query } from "firebase/firestore";

import { db } from "../../firebase";

import { UserContext } from "../../store/user-context";

import NewOrder from "../orders/new-order";

function Admin() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [newOrder, setNewOrder] = useState(false);

    const { user } = useContext(UserContext);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const q = query(collection(db, "users"));
                const querySnapshot = await getDocs(q);
                const users = [];

                querySnapshot.forEach((doc) => {
                    users.push({ ...doc.data(), id: doc.id });
                });

                setUsers(users);
            } catch (error) {
                console.log(error);
            }
        }

        getUsers();
    }, []);

    return (
        <div className="admin">
            <div className="admin-header">
                <h1 className="admin-title">Admin for {user.email}</h1>
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