import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";

import { UserContext } from "../store/user-context";

import logo from '../assets/images/bp_global_logo.png';

export default function MainNavigation() {
    const { user, isAdmin } = useContext(UserContext);
    
    return (
        <div className="main-navigation">
            <div className="main-navigation-left">
                <Link to='/' className="navigation-logo-link" end>
                    <img src={logo} alt='nav-logo' width='80%' />
                </Link>
            </div>

            <div className="main-navigation-right">
                <p className="navigation-phone">800-555-5555</p>

                <div className="navigation-links-wrapper">

                    <NavLink to='/' className={({isActive}) => isActive ? 'nav-link link-active' : 'nav-link'}>Home</NavLink>
                    <NavLink to='/about' className={({isActive}) => isActive ? 'nav-link link-active' : 'nav-link'}>About Us</NavLink>
                    <NavLink to='/contact' className={({isActive}) => isActive ? 'nav-link link-active' : 'nav-link'}>Contact Us</NavLink>

                    {user ? isAdmin ? (
                        <NavLink to='/admin' className={({isActive}) => isActive ? 'nav-link link-active' : 'nav-link'}>Admin</NavLink>
                    ) : (
                        <NavLink to='/account' className={({isActive}) => isActive ? 'nav-link link-active' : 'nav-link'}>My Account</NavLink>
                    ) : (
                        <>
                            <NavLink to='/login' className={({isActive}) => isActive ? 'nav-link link-active' : 'nav-link'}>Login</NavLink>
                            <NavLink to='/signup' className={({isActive}) => isActive ? 'nav-link link-active' : 'nav-link'}>Register</NavLink>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}