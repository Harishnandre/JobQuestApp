import { createContext, useEffect, useState } from "react";
import axios from "axios";

// Define default context value
export const Authcontext = createContext({
  user: null,
  token: null,
  isLoggedIn: false,
});

// Provider component
const AuthcontextProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, token: null });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Set axios default header for authorization if token is present
  useEffect(() => {
    if (auth.token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [auth.token]);

  // Load user data from local storage on component mount
  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem("auth"));
      if (data && data.token) {
        setAuth({ user: data.user, token: data.token });
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Error loading auth data from local storage:", error);
    }
  }, []);

  return (
    <Authcontext.Provider value={[auth, setAuth, isLoggedIn, setIsLoggedIn]}>
      {children}
    </Authcontext.Provider>
  );
};

export default AuthcontextProvider;
