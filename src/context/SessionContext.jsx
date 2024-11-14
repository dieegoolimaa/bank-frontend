import { createContext, useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const SessionContext = createContext();

const SessionContextProvider = ({ children }) => {
    const [token, setToken] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    // verify token from backend and set it to state if it is valid
    const verifyToken = async (currentToken) => {
        try {
        const data = await axios.get(`${BACKEND_URL}/auth/verify`, {
            headers: {
                Authorization: `Bearer ${currentToken}`,
            },
        });
        if (data.status === 200) {
            const parsedData = await data.json();
            console.log(parsedData);
            setToken(currentToken);
            setIsLoading(false);
        } else {
            window.localStorage.removeItem("token");
            setIsLoading(false);
        }    
        } catch (error) {
            console.log(error);
            window.localStorage.removeItem("token");
            setIsLoading(false);
        }
    };

    // check if there is a token in localStorage when the component mounts
    useEffect(() => {
        const currentToken = window.localStorage.getItem("token");
        if (currentToken) {
            verifyToken();
        } else {
            setIsLoading(false);
        }
    }, []);
    
    // save token to localStorage when it changes
    useEffect(() => {
        if (token) {
            window.localStorage.setItem("token", token);
        } else {
            window.localStorage.removeItem("token");
        }
    }, [token]);

    // log out and remove token from localStorage
    const logout = () => {
        setToken("");
        window.localStorage.removeItem("token");
    }

    // make request with token in headers
    const makeRequest = async (endpoint, method = "GET", data) => {
        try {
            const response = await axios(
                `${BACKEND_URL}/api/${endpoint}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                    method,
                }
            );
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    // provide token, setToken, isLoading and logout to children components
    return (
        <SessionContext.Provider value={{ token, setToken, isLoading, logout, makeRequest }}>
            {children}
        </SessionContext.Provider>
    );
};

export default SessionContextProvider;

SessionContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
