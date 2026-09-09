import { createContext, useContext, useState, useEffect } from "react";
import { checkCurrentUser, triggerCsrfToken } from "../api/auth";

//Create the context container 
const AuthContext = createContext();

// The Provider component — wraps app, holds the actual state that can be accessed direclty by all children
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);


    useEffect(() => {
    const load = async () => {
      try {
        const checked = await checkCurrentUser();
        if (checked){
            setUser(checked);
            await triggerCsrfToken();
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

    return (
        <AuthContext.Provider value={{ user, setUser, loading, error }}>
            {children}
        </AuthContext.Provider>
    );
}

// convenience hook — components call this instead of useContext(AuthContext) directly
export function useAuth() {
    return useContext(AuthContext);
}