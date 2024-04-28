import { Link } from "react-router-dom";

function UsersChartItem({ user }) {

    return (
        <Link to={`/users/${user.id}`} className="users-chart-item">
            <p className="users-chart-item-name">{user.name}</p>
            <p className="users-chart-item-email">{user.email}</p>
        </Link>
    );
}

export default UsersChartItem;