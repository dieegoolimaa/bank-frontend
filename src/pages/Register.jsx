// Register user page
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

// Register function 
const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const submitHandler = (e) => {
        e.preventDefault();

        try {
            const data = axios.post(`${BACKEND_URL}/auth/register`, {
                username,
                email,
                password,
            });
            console.log(data);
            toast.success("User registered successfully");
            navigate("/login");
            
        } catch (error) {
            console.log(error);
            toast.error("User registration failed");
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={submitHandler}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
            </form>
            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
};

export default Register;
