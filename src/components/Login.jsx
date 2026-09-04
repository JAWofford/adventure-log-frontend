import { useState} from 'react';
import { loginUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {

 //initialize a single state object for all the form fields
      const [formData, setFormData] =useState({
        userName: "",
        password: ""
      })


      const [loginError, setLoginError] = useState("");

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
    setLoginError("");
     try{
        await loginUser(formData);
        navigate('/dashboard');
        } catch (err){
          if( err instanceof TypeError){
            setLoginError("We couldn't connect to the server. Please try again in a moment.")
          } else {
          setLoginError(err.message);
          }
        }
  }

  return (
      <div className="login">
          <form onSubmit={handleSubmit} className="login-form">
              <h2>Login to Adventure Log</h2>
              {/* show registration form error here if there is one. */}
              {loginError && <p className="error">{loginError}</p>}
              <label>Username</label>
              <div className="login-form-field">
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
              <div className="reg-form-field">
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
              <div className="submit-button">
                  <button type="submit">
                      Login
                  </button>
              </div>
          </form>

      </div>

  )
}

