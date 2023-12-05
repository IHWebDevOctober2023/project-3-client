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
    const [helpPostsArray, setHelpPostsArray] = useState([])
    
    const [HelpPostIVolunteered, setHelpPostIVolunteered] = useState([])
    const [HelpPostIHaveBeenChosen, setHelpPostIHaveBeenChosen] = useState([])
    //console.log(userPosts);
    //let HelpPostIVolunteeredArray = userPosts.allHelpPostsIVolunteered
    //let HelpPostIHaveBeenChosenArray = userPosts.allHelpPostsIWasChosen



    useEffect(() => {
        fetch(`http://localhost:5005/user/${userIdFromAuth}`)
            .then((response) => {
                return response.json();
            })
            .then((jsonData) => {
                setUserData(jsonData);
                setHelpPostsArray(jsonData.helpPosts)
            })
            .catch((err) => console.log(err))
    }, []);

    useEffect(() => {
        fetch(`http://localhost:5005/help-post/volunteered/${userIdFromAuth}`)
            .then((response2) => {
                return response2.json();
            })
            .then((jsonData2) => {
                //console.log(jsonData2);
                setHelpPostIVolunteered(jsonData2.allHelpPostsIVolunteered)
                setHelpPostIHaveBeenChosen(jsonData2.allHelpPostsIWasChosen)

                //console.log('Este es el jsonData2',jsonData2);
                //console.log(userPosts.allHelpPostsIVolunteered[0]);
                //console.log(userPosts.allHelpPostsIWasChosen);
            })
            .catch((err) => console.log(err))
    }, []);


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

                            {/* show all posts you have created */}
                            {helpPostsArray.length > 0 ?
                                <div>
                                    <div>
                                        <h3>My posts:</h3>
                                        {
                                            helpPostsArray.map((eachPost, index) => {
                                                return (<PostCard key={index} post={eachPost} />);
                                            })
                                        }
                                    </div>
                                </div> : <p>You have no posts yet</p>}

                            {/* show all post that you have been chosen as volunteer */}
                            {HelpPostIHaveBeenChosen.length > 0 ?
                                <div>
                                    <div>
                                        <h3>I have've been chosen as volunteered:</h3>
                                        {
                                            HelpPostIHaveBeenChosen.map((eachPost, index) => {
                                                return (<PostCard key={index} post={eachPost} />);
                                            })
                                        }
                                    </div>
                                </div> : <p>You have not been chosen for volunteer yet</p>}

                            {/* show all post you have volunteered to do */}
                            {HelpPostIVolunteered.length > 0 ?
                                <div>
                                    <div>
                                        <h3>I have volunteered to:</h3>
                                        {
                                            HelpPostIVolunteered.map((eachPost, index) => {
                                                //console.log("post ", eachPost);
                                                return (<PostCard key={index} post={eachPost} />);
                                            })
                                        }
                                    </div>
                                </div> : <p>You have no pending volunteer </p>}
                        </div>
                    </div>
                </div>
                : <Loading />}
        </>
    )
}

export default MyProfile;