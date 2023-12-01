import "./UserProfile.css";
import { useEffect, useState } from "react";
import { Navigate, redirect, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { useContext } from "react";


function UserProfile() {
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
    const { userId } = useParams();
    const userIdFromAuth = user._id
    console.log(user._id);
    const [userData, setUserData] = useState('')
    
    console.log(userId === userIdFromAuth);
    
    
    useEffect(() => {
        fetch(`http://localhost:5005/user/${userId}`)
        .then((response) => {
            return response.json();
        })
        .then((jsonData) => {
            setUserData(jsonData);
        })
        .catch((err)=>console.log(err))

        
        console.log(userId===userIdFromAuth);
        console.log(userIdFromAuth);
    },[])

    return (
        <div>
            {userId === userIdFromAuth ? <Navigate to="/myprofile"/> :
            <>
            <h1>User Profile</h1>
            <h2>{userData.name}</h2>
            <h2>user ID:{userData._id}</h2>
            <img className="user-profilepicture" src={userData.profilePicture} alt={userData.name} />
            <p>Location: {userData.location}</p>
            <p>Skills: {userData.skills}</p>
            <p>Number of tokens: {userData.tokens}</p>
            {/* {userData.helpPosts.map()} */}
            <p>Your posts:{userData.helpPosts}</p></>
    }
{/*    los helpPosts van a ser un array, deberiamos usar map, pero todavia no tengo helpPosts created para probar.
 */}        </div>
    );
}

export default UserProfile;