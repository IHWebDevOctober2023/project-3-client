import "./MyProfile.css";
import { useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { useContext } from "react";


function MyProfile() {
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
    const userIdFromAuth = user._id

    const [userData, setUserData] = useState('')
    console.log(userData);


    useEffect(() => {
        fetch(`http://localhost:5005/user/${userIdFromAuth}`)
            .then((response) => {
                return response.json();
            })
            .then((jsonData) => {
                setUserData(jsonData);
            })
            .catch((err) => console.log(err))
    }, [])


    return (
        <div className="profile-container">
            <div className="profile-card">
                
                <div className="profile-picture-container">

                    <img className="user-profilepicture" src={userData.profilePicture} alt={userData.name} />
                </div>

                <div className="user-details-container">
                    <h2>{userData.name}</h2>
                    <div className="location-container">
                        <h4>Location:</h4>
                        <p>{userData.location}    <i className="fa fa-map-marker"></i></p>
                    </div>
                    <div className="skills-container">
                        <h4 className="skills-title">Skills:</h4>
                        <p> {userData.skills}</p>
                    </div>
                    <div className="tokens-container">
                        <p>Number of tokens: </p>
                        <p className="tokens-number">{userData.tokens}</p>
                    </div>
                    {/* {userData.helpPosts.map()} */}
                    <h4>Your posts:{userData.helpPosts}</h4>
                </div>
            </div>


            {/*    los helpPosts van a ser un array, deberiamos usar map, pero todavia no tengo helpPosts created para probar.
             */}
        </div>
    );
}

export default MyProfile;