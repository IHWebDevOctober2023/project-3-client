import "./UserProfile.css";
import { useEffect, useState } from "react";
import { useNavigate, Navigate, redirect, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { useContext } from "react";



function UserProfile() {
    const navigate = useNavigate();
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
    const { userId } = useParams();
    const userIdFromAuth = user._id
    const [userData, setUserData] = useState('')
    const BACKEND_ROOT = import.meta.env.VITE_SERVER_URL;

    const isMe = () => {
        if (user._id === userIdFromAuth) {
            return true;
        }
        else {
            return false;
        }
    }

    useEffect(() => {
        fetch(`${BACKEND_ROOT}/user/${userId}`)
            .then((response) => {
                return response.json();
            })
            .then((jsonData) => {
                setUserData(jsonData);
            })
            .catch((err) => console.log(err))
    }, [])

    return (
        <>
            {userData && !isMe() ? navigate("/myprofile") : (
                <div>
                    <div>
                        <h1>User Profile</h1>
                        <h2>{userData.name}</h2>
                        <h2>user ID:{userData._id}</h2>
                        <img className="user-profilepicture" src={userData.profilePicture} alt={userData.name} />
                        <p>Location: {userData.location}</p>
                        <p>Skills: {userData.skills}</p>
                        <p>Number of tokens: {userData.tokens}</p>
                        <p>Your posts:{userData.helpPosts}</p>
                    </div>
                </div>)}
        </>);
}

export default UserProfile;