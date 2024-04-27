import { useContext, useState } from "react";
import { useNavigate } from "react-router";

import { UserContext } from "../../store/user-context";
import { UsersContext } from "../../store/users-context";

import NewOrder from "../orders/new-order";

function Admin() {
    const navigate = useNavigate();
    const [ adminContent, setAdminContent ] = useState('');

    const { user } = useContext(UserContext);
    const { users } = useContext(UsersContext);

    return (
        <div className="admin">
            <div className="admin-menu">
                <p className="admin-menu-item" onClick={() => setAdminContent('')}>Admin Home</p>
                <p className="admin-menu-item" onClick={() => setAdminContent('users')}>All Users</p>
                <p className="admin-menu-item" onClick={() => setAdminContent('new-order')}>Create New Order</p>

                <hr />

                <p className="admin-menu-item" onClick={() => navigate('/account/edit')}>Edit Account</p>
            </div>

            <div className="admin-body">
                <div className="admin-header">
                    <h1 className="admin-title">Admin for {user.name}</h1>
                </div>

                <div className="admin-content">

                    {adminContent === '' && (
                        <p className="admin-content-title">Admin Home</p>
                    )}

                    {adminContent === 'users' && (
                        <>
                            <p className="admin-content-title">All Users</p>

                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user.id}>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <button className="btn btn-secondary admin-button" onClick={() => setAdminContent('')}>Close Table</button>
                        </>
                    )}

                    {adminContent === 'new-order' && (
                        <>
                            <p className="admin-content-title">New Order</p>

                            <NewOrder customers={users} />

                            <button className="btn btn-secondary admin-button" onClick={() => setAdminContent('')}>Close Table</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Admin;