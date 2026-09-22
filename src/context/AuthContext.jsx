import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkCurrentUser, logoutUser } from "../api/auth";

//Create the context container 
const AuthContext = createContext();

// The Provider component — wraps app in main.jsx, holds the actual state that can be accessed directly by all children
export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const checked = await checkCurrentUser();
        if (checked) {
          setUser(checked);
        }
      } catch (err) {
        console.error('checkCurentUser:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
      navigate('/login');
    } catch (err) {
      console.error('LogOutUser:', err);
      setError(err.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, error, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// convenience hook — components call this instead of useContext(AuthContext) directly
export function useAuth() {
  return useContext(AuthContext);
}