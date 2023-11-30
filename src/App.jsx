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

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={
          <IsAnon>
            <LandingPage />
          </IsAnon>


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
          path="/user/:userId"
          element={
            <IsPrivate>
              <UserProfile />
            </IsPrivate>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
