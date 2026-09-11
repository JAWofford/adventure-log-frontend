import { useState } from 'react';
import { loginUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AppLink from "./AppLink";
import Button from "./Button";
import './Login.css';

export default function Login() {

    //initialize a single state object for all the form fields
    const [formData, setFormData] = useState({
        userName: "",
        password: ""
    })
    const [loginError, setLoginError] = useState("");
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoginError("");
        try {
            const loggedInUser = await loginUser(formData);
            setUser(loggedInUser);
            navigate('/dashboard');
        } catch (err) {
            if (err instanceof TypeError) {
                setLoginError("We couldn't connect to the server. Please try again in a moment.")
            } else {
                setLoginError(err.message);
            }
        }
    }

    return (
        <div className="wrap">
            <div className="page-head">
                <h1>Login to Continue Your Journey</h1>
            </div>
            <div className="layout">
                <form onSubmit={handleSubmit} className="form-panel">
                    {/* show form error here if there is one. */}
                    {loginError && <p className="error">{loginError}</p>}
                    <div className="field">
                        <label>Username</label>
                        <input
                            type="text"
                            id="userName"
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                            required
                            autoComplete='username'
                        />
                    </div>
                    <div className="field">
                        <label>Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            autoComplete='current-password'
                        />
                    </div>
                    <div>
                        <Button
                            className="submit-button-login"
                            type="submit"
                            label="Login" />
                    </div>
                </form>
                    <div className="side-bar">
                        <h3>New Here?</h3>
                            <p>Ready to keep track of the places you've been and the journeys still ahead? Create your Adventure Log to save your trips, 
                            share campground reviews, and collect memories along the way.
                        </p>
                    <AppLink
                        to="/register"
                        className="register"
                        label="Start Your Adventure"
                    />
                    </div>
               

            </div>

        </div>
    )
}

