
import { useAuth } from "../context/AuthContext"
import { useState } from "react";
import AppLink from "./AppLink";
import Button from "./Button";
import './TopNav.css';


export default function TopNav() {


    const { user, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => {
        setMenuOpen(false);
    };


    return (
        <div className="topnav">
            <div className="brand">
                <span className="mark">A</span>Adventure&nbsp;Log
            </div>

            {/* Navigation */}
            <div className={`nav-menu ${menuOpen ? "menu-open" : ""}`}>
                <div className="nav-app-links">
                    <AppLink
                        to="/"
                        className="home"
                        label="Home"
                        onClick={closeMenu} />
                    {user && (
                        <>
                            <AppLink
                                to="/dashboard"
                                className="dashboard"
                                label="Dashboard"
                                onClick={closeMenu} />
                            <AppLink
                                to="/stickers"
                                className="sticker-btn"
                                label="Stickers"
                                onClick={closeMenu} />
                        </>
                    )}

                </div>

                {/* Login / Logout */}
                <div className="nav-user-link">
                    {!user ? (
                        <AppLink
                            to="/login"
                            className="login"
                            label="Login"
                            onClick={closeMenu} />

                    ) : <Button
                        className="logout"
                        onClick={() => {
                            closeMenu();
                            logout();
                        }}
                        label="Logout" />}
                </div>
            </div>

            {/* Hamburger */}
            <button
                className="hamburger"
                onClick={toggleMenu}
                aria-label="Toggle navigation menu"
                aria-expanded={menuOpen}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

        </div>


    )
}