import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../components/AxiosApi";
import { toast } from "react-toastify";
import { useSession } from "../context/SessionContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { checkSession } = useSession();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await AxiosApi.post(
        "/auth/login",
        { email, password },
        { withCredentials: true }
      );
      if (response.status === 200) {
        console.log("Login successful");
        toast.success("Login successful");
        await checkSession();
        navigate("/home");
      }
    } catch {
      console.error("Login failed");
      toast.error("Login failed");
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

export default LoginPage;
