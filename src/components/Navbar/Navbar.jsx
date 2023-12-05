import "./Navbar.css";
import { Link, useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  const [userData, setUserData] = useState('')
  const { userId } = useParams()

  /*  console.log("user",user._id); */

 

  const handleSidebar = () => {
    const sideBar = document.querySelector(".navbar .sidebar");

    sideBar.classList.toggle("hidden");
    if (sideBar.style.right === "0px") {

      sideBar.style.right = "-400px"

    }
  }
  /* fetch(`${BACKEND_ROOT}/user/${userIdFromAuth}`, {mode: 'cors'}) */

  useEffect(() => {
    if (user) {
      const BACKEND_ROOT = import.meta.env.VITE_SERVER_URL;

      fetch(`http://localhost:5005/user/${user._id}`)
        .then((response) => response.json())
        .then((responseJson) => {
          setUserData(responseJson);
          /* console.log("response",responseJson) */

        })
        .catch((err) => console.log(err));

    }
  }, [user])


  return (
    <div className="navbar-container">

      <nav className="navbar">


        {isLoggedIn && (
          <>
            <Link to="/home">
              <img className="logo" src="/images/4H-2.svg" alt="" />
            </Link>

            <img className="right-button" onClick={handleSidebar} src={userData.profilePicture} alt="profile picture" />
            {/* <img src="https://picsum.photos/id/402/200/300" style={{ width: 50, height: 50, borderRadius: 25}} alt="profile" /> */}



            <div className="sidebar hidden">

              <div onClick={handleSidebar} className="center">
                <div></div>
              </div>

              <div className="sidebar-content ">
                <ul className="side-list">


                  <li >
                    <Link to="/myprofile">
                      <p onClick={handleSidebar} className="side-element">Profile</p>
                      {/* <img src="https://picsum.photos/id/402/200/300" style={{ width: 50, height: 50, borderRadius: 25}} alt="profile" /> */}
                    </Link>
                  </li>
                  <li >
                    <Link to="/createhelp">
                      <p onClick={handleSidebar} className="side-element">Create Help request</p>
                    </Link>
                  </li>


                  <li >
                  <Link to="/alltestimonies">
                    <p onClick={handleSidebar} className="side-element">Testimonies</p>
                    </Link>
                  </li>
                  <li >
                  <Link to="/editprofile">
                    <p onClick={handleSidebar} className="side-element">Edit profile</p>
                    </Link>
                  </li>

                  <li >
                  
                    <p onClick={logOutUser} className="side-element">Logout</p>
                  </li>

                </ul>
              </div>

            </div>
          </>
        )}

        {!isLoggedIn && (
          <>
                  <Link to="/">
                    <img className="logo" src="/images/4H-2.svg" alt="" />
                  </Link>
                

                <div className="nav-landing-left">
                  <Link to="/signup">
                    <p className="nav-b-left">Sign Up</p>
                  </Link>
               

                  <Link to="/login">
                    <p className="nav-b-left">Login</p>
                  </Link>
                </div>

         

           
          </>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
