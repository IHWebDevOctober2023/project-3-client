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
    const BACKEND_ROOT = import.meta.env.VITE_SERVER_URL;

    useEffect(() => {
        fetch(`${BACKEND_ROOT}/user/${userIdFromAuth}`)
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
        fetch(`${BACKEND_ROOT}/help-post/volunteered/${userIdFromAuth}`)
            .then((response2) => {
                return response2.json();
            })
            .then((jsonData2) => {
                setHelpPostIVolunteered(jsonData2.allHelpPostsIVolunteered)
                setHelpPostIHaveBeenChosen(jsonData2.allHelpPostsIWasChosen)
            })
            .catch((err) => console.log(err))
    }, []);

    return (
        <>
            {userData ?
                <div className="profile-container">
                    <div className="profile-card">

                        <div className="user-details-picture-responsive">
                            <div className="profile-picture-container">
                                <img className="user-profilepicture" src={userData.profilePicture} alt={userData.name} />
                            </div>

                            <div className="user-details-container">
                                <div className="user-details-responsive">

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
                                </div>
                            </div>
                        </div>
                        <div className="user-details-container">

                            {/* show all posts you have created */}
                            {helpPostsArray.length > 0 ?
                                <div>
                                    <h3>My posts:</h3>
                                    <div className="cards-container">
                                        {
                                            helpPostsArray.map((eachPost, index) => {
                                                return (<PostCard key={index} post={eachPost} />);
                                            })
                                        }
                                    </div>
                                </div> : <p>You have no posts yet</p>}
                            {/* show all post that you have been chosen as volunteer */}
                            {HelpPostIHaveBeenChosen.length > 0 ?
                                <div >
                                    <h3>I have've been chosen as volunteered:</h3>
                                    <div className="cards-container">
                                        {
                                            HelpPostIHaveBeenChosen.map((eachPost, index) => {
                                                return (<PostCard key={index} post={eachPost} />);
                                            })
                                        }
                                    </div>
                                </div> : <p>You have not been selected to volunteer yet</p>}
                            {/* show all post you have volunteered to do */}
                            {HelpPostIVolunteered.length > 0 ?
                                <div>
                                    <h3>I have volunteered to:</h3>
                                    <div className="cards-container">
                                        {
                                            HelpPostIVolunteered.map((eachPost, index) => {
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