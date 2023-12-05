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
    

    const isMe = () => {
        // console.log ("isCreator: ", user._id === helpData.foundHelpPost.creator._id, user._id, helpData.foundHelpPost.creator._id);
        if (user._id === userIdFromAuth) {
            //console.log("is creator");
            return true;
        }
        else {
            //console.log("is NOT creator");
            return false;
        }
    }


    useEffect(() => {
        fetch(`http://localhost:5005/user/${userId}`)
            .then((response) => {
                return response.json();
            })
            .then((jsonData) => {
                setUserData(jsonData);
                //console.log(userData)
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