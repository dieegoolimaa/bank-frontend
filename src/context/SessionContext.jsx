import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Props from "prop-types";

const SessionContext = createContext();

export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    // Check session on mount
    const checkSession = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/auth/check-session`, {
          withCredentials: true, // Allows sending cookies
        });
        setIsAuthenticated(response.data.isAuthenticated);
        setLoading(false);
      } catch (error) {
        console.error("Error checking session:", error);
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/auth/login`,
        { email, password },
        { withCredentials: true } // Allows backend to set cookie
      );
      if (response.status === 200) {
        setIsAuthenticated(true);
        navigate("/home");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${BACKEND_URL}/auth/logout`, {}, { withCredentials: true });
      setIsAuthenticated(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <SessionContext.Provider value={{ isAuthenticated, loading, login, logout }}>
      {!loading && children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;

// PropTypes for SessionProvider component 
SessionProvider.propTypes = {
  children: Props.node.isRequired,
};