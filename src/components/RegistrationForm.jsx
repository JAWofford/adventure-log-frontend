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
    if (formData.password !== formData.confirmPassword) {
      alert("Your passwords do not match, please try again.");//TODO: Change to an error state variable.
      return
    }
    const {confirmPassword, ...registrationData } = formData;
    
    try{
    await registerUser(registrationData);
    navigate('/dashboard');
    } catch (err){
      alert(err.message);
    }
    }


  return (
    <div className="registration">
        
      <form onSubmit={handleSubmit} className='reg-form'>
        <h2 className="reg-form-title">Create Your Adveture Log Account</h2>
        <div className="reg-form-field">
          <label>Username</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
          />
        </div>
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
          />
        </div>
        <div className="reg-form-field">
          <label>Confirm Your Passord:</label>
          <input
            type="password"
            placeholder="retype password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
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

