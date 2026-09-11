
import {useAuth} from "../context/AuthContext"
import AppLink from "./AppLink";
import Button from "./Button";
import './TopNav.css';


export default function TopNav() {


const {user, logout} = useAuth();
 

    return (
        <div className="topnav wrap">
            <div className="brand">
                <span className="mark">A</span>Adventure&nbsp;Log
            </div>
            <div className="nav-app-links">
                <AppLink
                to="/"
                className="home"
                label="Home" />
                {user &&
                <div>
                <AppLink
                to="/dashboard"
                className="dashboard"
                label="Dashboard" />
                </div>
                    }
            </div>
            
            {!user ? (
                <AppLink
                to="/login"
                className="login"
                label="Login" />

            ): <Button
                className="logout"
                onClick={logout} 
                label="Logout"/>}

        </div>
        
    )
}