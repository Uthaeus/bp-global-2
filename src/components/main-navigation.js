import { NavLink, Link } from "react-router-dom";

import logo from '../assets/images/bp_global_logo2.png';

export default function MainNavigation() {
    
    return (
        <div className="main-navigation">
            <div className="main-navigation-left">
                <Link to="/" className="nav-logo"><img src={logo} alt="logo" className="nav-logo-image" /></Link>
            </div>

            <div className="main-navigation-right">
                <NavLink to="/" className={({ isActive }) => isActive ? "nav-link link-active" : "nav-link"}>Home</NavLink>
                <NavLink to="/login" className={({ isActive }) => isActive ? "nav-link link-active" : "nav-link"}>Log in</NavLink>
                <NavLink to="/signup" className={({ isActive }) => isActive ? "nav-link link-active" : "nav-link"}>Sign up</NavLink>
            </div>
        </div>
    )
}