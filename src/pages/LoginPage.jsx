// Login Page with JWT and Cookies

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../components/AxiosApi";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AxiosApi.post("/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem("accessToken", response.data.accessToken);
        console.log(response.data);
        toast.success("Login successful");
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
      toast.error("Login failed");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        {/* Login with username or email */}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Create an account and be part of our bank:{" "}
        <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default LoginPage;
