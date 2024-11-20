import { useContext } from "react";
import { SessionContext } from "../context/SessionContext";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const { token, logout } = useContext(SessionContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav>
      <ul>
        {token ? (
          <>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : null}
      </ul>
    </nav>
  );
};

export default NavBar;
