import "./MyProfile.css";
import { useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { useContext } from "react";
import Loading from "../../components/Loading/Loading";
import PostCard from "../../components/PostCard/PostCard";


function MyProfile() {
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
    const userIdFromAuth = user._id

    const [userData, setUserData] = useState('')
    //console.log(userData);
    //console.log(userData.helpPost);
    const helpPostsArray= userData.helpPosts


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
        <>
            {userData ?
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

                            {helpPostsArray.length > 0 ? 
                            <div>
                                <div>
                                    <h3>My posts:</h3>
                                    {
                                        helpPostsArray.map((eachPost, index) => {
                                            //console.log("post ", eachPost);
                                            return (<PostCard key={index} post={eachPost} />);
                                        })
                                    }
                                </div>
                            </div>: <p>You have no posts yet</p>}

                        </div>
                    </div>
                </div>
                : <Loading />}
        </>
    )
}

export default MyProfile;