import "./PostDetails.css";
import { useEffect, useState } from "react";
import { Link, useNavigate, redirect, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { useContext } from "react";

function PostDetails() {
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
    const { helpId } = useParams();
    const [helpData, setHelpData] = useState('')
    const navigate = useNavigate()

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

    const deleteHelp = () => {
        const BACKEND_ROOT = import.meta.env.VITE_SERVER_URL;
        fetch(`${BACKEND_ROOT}/help-post/edithelp/${helpId}`, 

        {method: "DELETE", 

        headers:{
        'Content-Type': 'application/json'
        }},

        { mode: 'cors' })

            .then((response) => {
                if (response.ok){
                    //throw new Error('Could not delete help')
                    navigate("/home")
                };
            })
            .catch((err) => console.log(err))
        
    }

    return (
        <div className="general-post-container">
            <div className="post-details-container">
                <div className="help-container">
                    <p className="post-details">POST DETAILS</p>
                </div>

                {helpData && <div className="info-post-container">
                    <img className="help-image" src={helpData.foundHelpPost.helpImageUrl} alt="" />
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
                           
                            <p onClick={deleteHelp} className="edit-button">DELETE POST</p>
                            
                        </div>

                    }

                    {user._id !== helpData.foundHelpPost.creator._id &&

                        <p className="I-can-help">I CAN HELP</p>

                    }
                </div>}
            </div>
        </div>
    );
}

export default PostDetails;