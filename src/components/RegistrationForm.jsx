import {useState} from 'react';
import { registerUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';

export default function RegistrationForm() {

  //initialize a single state object for all the form fields
  const [formData, setFormData] =useState({
    userName: "",
    email: "",
    displayName: "",
    password: "",
    confirmPassword: "",
  })

  const [regError, setRegError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setRegError("");

    //UserName Validation
    const usernamePattern = /^[a-zA-Z0-9_-]{3,30}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !usernamePattern.test(formData.userName) &&
      !emailPattern.test(formData.userName)
    ) {
      setRegError("Please enter a valid username or email address.");
      return;
    }

    // Password Validation
    if (formData.password.length < 8) {
    setRegError("Your password must be at least 8 characters.");
    return;
  }
    if (formData.password !== formData.confirmPassword) {
      setRegError("Your passwords do not match, please try again.")
      return
    }
    //after passwords are confirmed, delete duplicate to pass to backend.
    const registrationData = {...formData};
    delete registrationData.confirmPassword;
    
    try{
    await registerUser(registrationData);
    navigate('/dashboard');
    } catch (err){
      if( err instanceof TypeError){
        setRegError("We couldn't connect to the server. Please try again in a moment.")
      } else {
      setRegError(err.message);
      }
    }
  }


  return (
    <div className="registration">
        
      <form onSubmit={handleSubmit} className='reg-form'>
        <h2 className="reg-form-title">Create Your Adventure Log Account</h2>
        {/* show registration form error here if there is one. */}
        {regError && <p className="error">{regError}</p>}
        <div className="reg-form-field">
          <label>Username</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
            minLength={3}
            maxLength={50}
            autoComplete='username'
          />
        </div>
        {/* display userName requirements as user types until they meet requirement. */}
        {formData.userName.length > 0 &&
          !/^[a-zA-Z0-9_-]{3,30}$/.test(formData.userName) &&
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.userName) && (
            <p className="validation-message">
              3–20 characters, or a valid email address. No spaces.
            </p>
          )}
        <div className="reg-form-field">
          <label>Display Name</label>
          <input
            type="text"
            placeholder="Choose a screen name others will see"
            id="displayName"
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="reg-form-field">
          <label>Email Address:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete='email'
          />
        </div>
        <div className="reg-form-field">
          <label>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={8}
            autoComplete='new-password'
          />
        </div>
        {/* display password requirements as user types until they meet requirement. */}
        {formData.password.length > 0 && formData.password.length < 8 && (
          <p className="validate-message">Password must be at least 8 characters.</p>
        )}
        <div className="reg-form-field">
          <label>Confirm Your Password:</label>
          <input
            type="password"
            placeholder="retype password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            autoComplete='new-password'
          />
        </div>
        <div className="submit-button">
        <button type="submit">
        Register Now
      </button>
      </div>
      </form>
    </div>
  )
}

