import { useContext } from "react";

import { UserContext } from "../../store/user-context";

function Admin() {

    const { user } = useContext(UserContext);

    return (
        <div className="admin">
            <h1 className="admin-title">Admin for {user.email}</h1>
        </div>
    );
}

export default Admin;