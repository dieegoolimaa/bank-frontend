import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  SessionProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");

    if (storedToken) {
      setToken(storedToken);
    } else {
      navigate("/login");
      setToken(null);
    }
  }, []);

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem("accessToken", newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("accessToken");
  };

  const isAuthenticated = () => !!token;

  return (
    <SessionContext.Provider value={{ token, login, logout, isAuthenticated }}>
      {children}
    </SessionContext.Provider>
  );
};
