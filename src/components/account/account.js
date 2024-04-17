import { useContext } from "react";

import { UserContext } from "../../store/user-context";

export default function Account() {
    const { user } = useContext(UserContext);

    return (
        <div className="account">
            <h2 className="account-title">Account for {user.email}</h2>

            <div className="orders-container">
                <p className="account-text">You have no orders yet.</p>
            </div>
        </div>
    );
}