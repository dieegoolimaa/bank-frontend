import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import AxiosApi from "../components/AxiosApi";

const SessionContext = createContext();

export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check session on mount
  const checkSession = async () => {
    try {
      const response = await AxiosApi.get("/auth/check-session", {
        withCredentials: true,
      });

      if (response.status === 200) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }

      setLoading(false);
    } catch (error) {
      console.error("Session check failed:", error);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const logout = async () => {
    try {
      await AxiosApi.post(`/auth/logout`, {}, { withCredentials: true });
      setIsAuthenticated(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    console.log("isAuthenticated changed:", isAuthenticated);
  }, [isAuthenticated]);

  return (
    <SessionContext.Provider
      value={{ isAuthenticated, loading, logout, checkSession }}
    >
      {!loading && children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;

// PropTypes for SessionProvider component
SessionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
