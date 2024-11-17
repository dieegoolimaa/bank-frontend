import { useNavigate } from "react-router-dom";
import AxiosApi from "../components/AxiosApi";
import { useState } from "react";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await AxiosApi.post(
        "/auth/register",
        { username, email, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        console.log("Registration successful");
        toast.success("Registration successful");
        navigate("/login");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Registration failed";
      console.error("Registration error:", errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
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
    </div>
  );
};

export default RegisterPage;
