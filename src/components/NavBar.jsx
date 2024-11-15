import { useSession } from "../context/SessionContext";
import { Link } from "react-router-dom";

function NavBar() {
  const { isAuthenticated, logout } = useSession();

  return (
    <nav>
      {isAuthenticated ? (
        <>
          <Link to="/home">Home</Link>
          <button onClick={logout}>Logout</button>
        </>
      ) : null}
    </nav>
  );
}

export default NavBar;
