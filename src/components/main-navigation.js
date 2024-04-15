import { NavLink, Link } from "react-router-dom";

export default function MainNavigation() {
    
    return (
        <div className="main-navigation">
            <div className="main-navigation-left">
                <Link to="/" className="nav-logo">BP Global</Link>
            </div>

            <div className="main-navigation-right">
                <NavLink to="/" className={({ isActive }) => isActive ? "nav-link link-active" : "nav-link"}>Home</NavLink>
            </div>
        </div>
    )
}