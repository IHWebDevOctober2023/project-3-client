import "./App.css";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import Navbar from "./components/Navbar/Navbar";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";
import CreateTestimonyPage from "./pages/CreateTestimonyPage/CreateTestimonyPage";
import UserProfile from "./pages/UserProfile/UserProfile";
import CreateHelpForm from "./pages/CreateHelpForm/CreateHelpForm";
import MyProfile from "./pages/MyProfile/MyProfile";
import { useContext } from "react";
import { AuthContext } from "./context/auth.context";
import EditProfile from "./pages/EditProfile/EditProfile";
import PostDetails from "./pages/PostDetails/PostDetails";

function App() {
  const { isLoggedIn, isLoading } = useContext(AuthContext);
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            {!isLoggedIn?<LandingPage />: <MyProfile/>}
          </>
        } />
        <Route path="/home" element={
          <IsPrivate>
            <HomePage />
          </IsPrivate>
        } />
        <Route
          path="/profile"
          element={
            <IsPrivate>
              <ProfilePage />
            </IsPrivate>
          }
        />
        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
        <Route
          path="/createtestimony"
          element={
            <IsPrivate>
              <CreateTestimonyPage />
            </IsPrivate>
          }
        />
        <Route
          path="/createhelp"
          element={
            <IsPrivate>
              <CreateHelpForm/>
            </IsPrivate>
          }
        />
        <Route
          path="/help-post/:helpId"
          element={
            <IsPrivate>
              <PostDetails/>
            </IsPrivate>
          }
        />
        <Route
          path="/user/:userId"
          element={
            <IsPrivate>
              <UserProfile />
            </IsPrivate>
          }
        />
        <Route
          path="/myprofile"
          element={
            <IsPrivate>
              <MyProfile />
            </IsPrivate>
          }
        />
        <Route
          path="/editprofile"
          element={
            <IsPrivate>
              <EditProfile />
            </IsPrivate>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
