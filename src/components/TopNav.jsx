import { Link } from "react-router-dom"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../api/auth";

export default function TopNav() {

const [logoutError, setLogoutError] = useState("");
const navigate = useNavigate();

 const handleLogout = async (event) => {
    event.preventDefault();
    setLogoutError("");
     try{
        await logoutUser();
        navigate('/');
        } catch (err){
          if( err instanceof TypeError){
            setLogoutError("We couldn't connect to the server. Please try again in a moment.")
          } else {
          setLogoutError(err.message);
          }
        }
  }

    return (
        <div className="nav-tabs">
            <Link
                to="/login"
                className="nav-tab login" >
                Login
            </Link>

            <button onClick={handleLogout} className="nav-tab logout">
                Log Out
            </button>
            {/* this error should never really display,future update maybe create a toast if other parts of the app can use it. */}
            {/* show registration form error here if there is one. */}
            {logoutError && <p className="error">{logoutError}</p>}
        </div>

        
    )
}