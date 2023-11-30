import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <div className="navbar-container">
      <nav className="navbar">


        {isLoggedIn && (
          <>
            <Link to="/home">
              <button>Home</button>
            </Link>
            <button onClick={logOutUser}>Logout</button>

            <Link to="/profile">
              <button>Profile</button>
              {/* <img src="https://picsum.photos/id/402/200/300" style={{ width: 50, height: 50, borderRadius: 25}} alt="profile" /> */}
            </Link>
          </>
        )}

        {!isLoggedIn && (
          <>
            <div className="logo">
              <Link to="/">
                <button>Landing</button>
              </Link>
            </div>
            <Link to="/signup">
              {" "}
              <button>Sign Up</button>{" "}
            </Link>
            <Link to="/login">
              {" "}
              <button>Login</button>{" "}
            </Link>
          </>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
