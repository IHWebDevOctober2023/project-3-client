import "./App.css";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import Permission from "./pages/Permission/Permission";
import CreateFamily from "./pages/CreateFamily/CreateFamily";
import CreateTask from "./pages/CreateTask/CreateTask";

import Navbar from "./components/Navbar/Navbar";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>

        <Route
          path="/"
          element={
            <IsPrivate>
              <HomePage />
            </IsPrivate>
          }
        />

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
          path="/permission"
          element={
            <IsPrivate>
              <Permission />
            </IsPrivate>
          }
        />

        <Route
          path="/CreateFamily"
          element={
            <IsPrivate>
              <CreateFamily />
            </IsPrivate>
          }
        />

        <Route
          path="/CreateTask"
          element={
            <IsPrivate>
              <CreateTask />
            </IsPrivate>
          }
        />

      </Routes>

    </div>
  );
}

export default App;
