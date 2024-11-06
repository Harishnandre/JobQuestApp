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
    const loadUserData = async () => {
      const storedData = JSON.parse(localStorage.getItem("auth"));
      if (storedData && storedData.user_id && storedData.token) {
        try {
          // Set token in axios headers for the request
          axios.defaults.headers.common["Authorization"] = `Bearer ${storedData.token}`;
          
          // Fetch full user data from the backend using user_id
          const response = await axios.get(`http://localhost:5000/api/v1/user/get/${storedData.user_id}`);
          setAuth({ user: response.data.user, token: storedData.token });
          setIsLoggedIn(true);
        } catch (error) {
          console.error("Error fetching user data from backend:", error);
          setIsLoggedIn(false);
          setAuth({ user: null, token: null });
        }
      }
    };
    
    loadUserData();
  }, []);


  return (
    <Authcontext.Provider value={[auth, setAuth, isLoggedIn, setIsLoggedIn]}>
      {children}
    </Authcontext.Provider>
  );
};

export default AuthcontextProvider;
