import "./PostDetails.css";
import { useEffect, useState } from "react";
import { Link, Navigate, redirect, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { useContext } from "react";

function PostDetails() {
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
    const { helpId } = useParams();
    const [helpData, setHelpData] = useState('')
    // console.log("user", user)

    useEffect(() => {
        const BACKEND_ROOT = import.meta.env.VITE_SERVER_URL;
        fetch(`${BACKEND_ROOT}/help-post/${helpId}`, { mode: 'cors' })
            .then((response) => {
                return response.json();
            })
            .then((jsonData) => {
                //console.log("jsondata",jsonData);
                setHelpData(jsonData);
                console.log("datahelp", helpData)
            })
            .catch((err) => console.log(err))

    }, [])

    return (
        <div className="post-details-container">
            <div className="help-container">
                <p className="post-details">POST DETAILS</p>
            </div>

            {helpData && <div className="info-post-container">

                <h3 className="info-title">{helpData.foundHelpPost.title}</h3>

                <p className="details-location">{helpData.foundHelpPost.location}      <i className="fa fa-map-marker"></i></p>

                <p className="description-title">Description:</p>
                <p className="info-description"> {helpData.foundHelpPost.description}</p>

                <p className="creator-title">Creator: </p>
                <div className="post-creator-container">
                    <p className="name-creator">{user.name}</p>
                    <img className="creator-picture" src={helpData.foundHelpPost.creator.profilePicture} alt="" />
                </div>
                <p className="creator-title">Category:</p>
                <p className="details-category"> {helpData.foundHelpPost.category}</p>

                <p className="volunteer"></p>
                <p className="details-volunteer">USER: {helpData.foundHelpPost.volunteer} volunteered!</p>

                {user._id === helpData.foundHelpPost.creator._id &&
                    <div className="edit-help-buttons">
                        <Link to={`/edithelp/${helpId}`}>
                    <p className="edit-button">EDIT POST</p>
                    </Link>
                    <p className="edit-button">DELETE POST</p>
                    </div>

                }

                {user._id !== helpData.foundHelpPost.creator._id &&

                    <p className="I-can-help">I CAN HELP</p>

                }
            </div>}
        </div>
    );
}

export default PostDetails;