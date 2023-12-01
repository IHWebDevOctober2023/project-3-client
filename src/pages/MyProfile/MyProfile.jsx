import "./MyProfile.css";
import { useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { useContext } from "react";


function MyProfile() {
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
    const userIdFromAuth = user._id
    
    const [userData, setUserData] = useState('')


    useEffect(() => {
        fetch(`http://localhost:5005/user/${userIdFromAuth}`)
            .then((response) => {
                return response.json();
            })
            .then((jsonData) => {
                setUserData(jsonData);
            })
            .catch((err)=>console.log(err))
    },[])


    return (
        <div>
            <h1>My Profile</h1>
            <h2>Name: {userData.name}</h2>
            <h2>user ID:{userData._id}</h2>
            <img className="user-profilepicture" src={userData.profilePicture} alt={userData.name} />
            <p>Location: {userData.location}</p>
            <p>Skills: {userData.skills}</p>
            <p>Number of tokens: {userData.tokens}</p>
            {/* {userData.helpPosts.map()} */}
            <p>Your posts:{userData.helpPosts}</p> 
{/*    los helpPosts van a ser un array, deberiamos usar map, pero todavia no tengo helpPosts created para probar.
 */}        </div>
    );
}

export default MyProfile;