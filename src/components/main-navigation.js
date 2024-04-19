import { NavLink, Link, useNavigate } from "react-router-dom";
import { useContext } from "react";

import { UserContext } from "../store/user-context";

import logo from '../assets/images/bp_global_logo.png';

export default function MainNavigation() {
    const navigate = useNavigate();
    const { user, isAdmin, logOutUser } = useContext(UserContext);

    const signOutHandler = async () => {
        logOutUser();
        navigate('/');
    }
    
    return (
        <div className="main-navigation">
            <div className="main-navigation-left">
                <Link to='/' className="navigation-logo-link">
                    <img src={logo} alt='nav-logo' width='80%' />
                </Link>
            </div>

            <div className="main-navigation-right">
                <div className="w-100 d-flex align-items-center justify-content-end">
                    {user && <p className="navigation-welcome">{user.name}</p>}
                    <p className="navigation-phone">800-555-5555</p>
                </div>

                <div className="navigation-links-wrapper">

                    <NavLink to='/' className={({isActive}) => isActive ? 'nav-link link-active' : 'nav-link'} end>Home</NavLink>
                    <NavLink to='/about' className={({isActive}) => isActive ? 'nav-link link-active' : 'nav-link'}>About Us</NavLink>
                    <NavLink to='/contact' className={({isActive}) => isActive ? 'nav-link link-active' : 'nav-link'}>Contact Us</NavLink>

                    {isAdmin && <NavLink to='/admin' className={({isActive}) => isActive ? 'nav-link link-active' : 'nav-link'}>Admin</NavLink>}

                    {user ? (
                        <>
                            <NavLink to='/account' className={({isActive}) => isActive ? 'nav-link link-active' : 'nav-link'}>My Account</NavLink>
                            <p className="nav-link" onClick={signOutHandler}><i className="bi bi-door-open-fill"></i></p>
                        </>
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