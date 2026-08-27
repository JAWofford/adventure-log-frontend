import {useState} from 'react'

export default function RegistrationForm() {

  //initialize a single state object for all the form fields
  const [formData, setFormData] =useState({
    username: "",
    email: "",
    displayName: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form Submitted Data:', formData)
    //API call logic here??
  }


  return (
    <div className="registration">
        
      <form onSubmit={handleSubmit} className='reg-form'>
        <h2 className="reg-form-title">Create Your Adveture Log Account</h2>
        <div className="reg-form-field">
          <label>Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
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

