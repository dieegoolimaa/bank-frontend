import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      // Send login request
      const response = await axios.post(
        `${BACKEND_URL}/auth/login`,
        { email, password },
        { withCredentials: true } // Ensures cookies are sent
      );
      console.log(response);

      // Handle the response
      if (response.status === 200) {
        console.log("Login successful:", response.data);
        toast.success("User logged in successfully");
        navigate("/home");
      } else {
        console.error("Login failed:", response.data);
        toast.error("User login failed");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "User login failed");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Still not registered? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default LoginPage;
