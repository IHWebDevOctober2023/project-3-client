import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Navigate } from "react-router-dom";
import Loading from "../Loading/Loading";

function IsAnon({ children }) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  // If the authentication is still loading ⏳
  if (isLoading) {
    return <Loading />;
  }

  if (isLoggedIn) {
    // If the user is logged in, navigate to home page ❌
    console.log("isloggedin => going to /");
    return <Navigate to="/" />;
  }

  // If the user is not logged in, allow to see the page ✅
  console.log("is anonymous => display children (LandingPage)");
  return children;
}

export default IsAnon;
