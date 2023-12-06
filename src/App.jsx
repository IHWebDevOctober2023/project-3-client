import "./App.css";
import { Routes, Route } from "react-router-dom";

import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage/HomePage";
import CreateFamily from "./pages/CreateFamily/CreateFamily";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import Permission from "./pages/Permission/Permission";
import CreateTask from "./pages/CreateTask/CreateTask";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";
import SubmitWeek from"./pages/SubmitWeek/SubmitWeek";


function App() {
  return (
    <div className="App">
      
      <Routes>
      
        <Route
          path="/"
          element={
            <IsPrivate>
              <HomePage/>
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
          path="/createfamily"
          element={
            <IsPrivate>
              <CreateFamily />
            </IsPrivate>
          }
        />

        <Route
          path="/createtask"
          element={
            <IsPrivate>
              <CreateTask />
            </IsPrivate>
          }
        />
         <Route
          path="/submitweek"
          element={
            <IsPrivate>
              <SubmitWeek />
            </IsPrivate>
          }
        />

      </Routes>

    </div>
  );
}

export default App;
