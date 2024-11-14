// Login page component
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../context/SessionContext";
import axios from "axios";
const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const { setToken } = useContext(SessionContext);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const data = axios.post(`${BACKEND_URL}/auth/login`, {
                username,
                password,
            });
            if (data.status === 200) {
                const parsedData = await data.json();
                console.log(parsedData);
                setToken(parsedData.token);
                navigate("/home");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return ( 
        <div>
            <h1>Login</h1>
            <form onSubmit={submitHandler}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </div>
     );
};


export default LoginPage