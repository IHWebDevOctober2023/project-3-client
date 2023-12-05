import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  return (
    <nav>
      <Link to="/">
        <button className="btn-navbar"><i class="fa-solid fa-house"></i></button>
      </Link>
      {isLoggedIn && (
        <>
          <Link to="/profile">
            <button className="btn-navbar"><i class="fa-solid fa-user-gear"></i></button>           
          </Link>
          <button onClick={logOutUser} className="btn-navbar"><i class="fa-solid fa-right-from-bracket"></i></button>
        </>
      )}
      {!isLoggedIn && (
        <>
          <Link to="/signup">
            {" "}
            <button className="btn-navbar"><i class="fa-solid fa-door-open"></i></button>{" "}
          </Link>
          <Link to="/login">
            {" "}
            <button className="btn-navbar"><i class="fa-solid fa-user-lock"></i></button>{" "}
          </Link>
        </>
      )}
    </nav>
  );
}
export default Navbar;
