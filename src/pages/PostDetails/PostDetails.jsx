import "./PostDetails.css";
import { useEffect, useState } from "react";
import { Navigate, redirect, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { useContext } from "react";

function PostDetails() {
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
    const { helpId } = useParams();
    const [helpData, setHelpData] = useState('')
    console.log("datahelp", helpData.creator)
    console.log("user", user)

    useEffect(() => {
        const BACKEND_ROOT = import.meta.env.VITE_SERVER_URL;
        fetch(`${BACKEND_ROOT}/help-post/${helpId}`, { mode: 'cors' })
            .then((response) => {
                return response.json();
            })
            .then((jsonData) => {
                console.log(jsonData);
                setHelpData(jsonData);
            })
            .catch((err) => console.log(err))

    }, [])

    return (
        <div className="post-details-container">
            <div className="help-container">
                <p className="post-details">POST DETAILS</p>
            </div>
            <div className="info-post-container">

                <h3 className="info-title">{helpData.title}</h3>

                <p className="details-location">{helpData.location}      <i class="fa fa-map-marker"></i></p>

                <p className="description-title">Description:</p>
                <p className="info-description"> {helpData.description}</p>

                    <p className="creator-title">Creator: </p>
                <div className="post-creator-container">
                    <p className="name-creator">{user.name}</p>
                    <img className="creator-picture" src={helpData.creator.profilePicture} alt="" />
                </div>
                <p className="creator-title">Category:</p>
                <p className="details-category"> {helpData.category}</p>

                <p className="volunteer"></p>
                <p className="details-volunteer">{helpData.volunteer} volunteered!</p>

                {user._id !== helpData.creator._id &&

                    <button>I CAN HELP</button>

                }
            </div>
        </div>
    );
}

export default PostDetails;