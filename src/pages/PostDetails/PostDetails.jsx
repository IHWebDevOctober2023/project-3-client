import "./PostDetails.css";
import { useEffect, useState } from "react";
import { Link, useNavigate, redirect, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { useContext } from "react";
import VolunteerCard from "../../components/VolunteerCard/VolunteerCard";

function PostDetails() {
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
    const { helpId } = useParams();
    const [helpData, setHelpData] = useState('')
    const [reload, setReload] = useState();
    const BACKEND_ROOT = import.meta.env.VITE_SERVER_URL;
    

    const navigate = useNavigate()

    const [message, setMessage] = useState();
    const [volunteersArray, setVolunteersArray] = useState([])
    const [selectedVolunteer, setSelectedVolunteer] = useState(null)
    console.log(selectedVolunteer)

    const isCreator = () => {
        // console.log ("isCreator: ", user._id === helpData.foundHelpPost.creator._id, user._id, helpData.foundHelpPost.creator._id);
        if (user._id === helpData.foundHelpPost.creator._id) {
            //console.log("is creator");
            return true;
        }
        else {
            //console.log("is NOT creator");
            return false;
        }
    }

    const isVolunteer = () => {
        //console.log("user._id: ", user._id, "helpData.foundHelpPost.volunteers: ", helpData.foundHelpPost.volunteers);
        if (user._id === helpData.foundHelpPost.selectedVolunteer) {
            //console.log("is selectedVolunteer");
            return true;
        }
        else if (helpData.foundHelpPost.volunteers.includes(user._id)) {
            //console.log("is volunteer");
            return true;
        }
        else {
            return false;
        }
    };

    const onIcanHelp = () => {
        // put the user into the post volunteers[]
        const reqBody = {
            volunteerId: user._id,
            postId: helpData.foundHelpPost._id
        }

        fetch(`${BACKEND_ROOT}/help-post/addvolunteer`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reqBody),
        })
            .then((fetchRes) => fetchRes.json())
            .then((resJson) => {
                setMessage(resJson.message);
                //console.log("MESSAGE: ", resJson.message);
            })
    }

const setStuff = () =>{
    fetch(`${BACKEND_ROOT}/help-post/${helpId}`, { mode: 'cors' })
            .then((response) => {
                return response.json();
            })
            .then((jsonData) => {
                console.log("jsondata",jsonData);
                setHelpData(jsonData);
                setVolunteersArray(jsonData.foundHelpPost.volunteers)
                setSelectedVolunteer(jsonData.foundHelpPost.selectedVolunteer)
                //console.log("jsonData", jsonData);
                //console.log("datahelp", helpData)
            })
            .then(() => {
                //console.log("IS VOLUNTEER?: ", isVolunteer());
            })
            .catch((err) => console.log(err))
}

    useEffect(() => {
        setStuff()
    }, [])

    const deleteHelp = () => {

        fetch(`${BACKEND_ROOT}/help-post/edithelp/${helpId}`,

            {
                method: "DELETE",

                headers: {
                    'Content-Type': 'application/json'
                }
            },

            { mode: 'cors' })

            .then((response) => {
                if (response.ok) {
                    //throw new Error('Could not delete help')
                    navigate("/home")
                };
            })
            .catch((err) => console.log(err))
    }

    const complete = () => {
        const reqBody = {
            volunteerId: _id,
            postId
        }
        fetch(`${BACKEND_ROOT}/help-post/selectvolunteer`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reqBody),
        })
    }

    return (
        <div className="general-post-container">
            <div className="post-details-container">
                <div className="help-container">
                    <p className="post-details">POST DETAILS</p>
                </div>

                {
                    message &&
                    <div className="message">{message} [X]</div>
                }

                {helpData && <div className="info-post-container">

                    <img className="help-image" src={helpData.foundHelpPost.helpImageUrl} alt={helpData.foundHelpPost.title} />
                    <h3 className="info-title">{helpData.foundHelpPost.title}</h3>
                    <p className="details-location">{helpData.foundHelpPost.location}      <i className="fa fa-map-marker"></i></p>



                    <p className="description-title">Description:</p>
                    <p className="info-description"> {helpData.foundHelpPost.description}</p>


                    <p className="creator-title">Creator: </p>
                    <div className="post-creator-container">
                        <p className="name-creator">{helpData.foundHelpPost.creator.name}</p>
                        <img className="creator-picture" src={helpData.foundHelpPost.creator.profilePicture} alt="" />
                    </div>
                    <p className="creator-title">Category:</p>
                    <p className="details-category"> {helpData.foundHelpPost.category}</p>

                    {user._id === helpData.foundHelpPost.creator._id &&
                        <div className="edit-help-buttons">
                            <Link to={`/edithelp/${helpId}`}>
                                <p className="edit-button">EDIT POST</p>
                            </Link>

                            <p onClick={deleteHelp} className="edit-button">DELETE POST</p>

                        </div>
                    }

                    <p className="volunteer"></p>
                    {volunteersArray.length > 0 ?
                        <div>
                            <p className="details-volunteer">  {`${volunteersArray.length}`} users volunteered: </p>
                            {volunteersArray.map((eachVolunteer, index) => {
                                //console.log(eachVolunteer);
                                //console.log(helpId)
                                return (<VolunteerCard key={index} volunteer={eachVolunteer} postId={helpId} setStuff={setStuff} />)
                            })}
                        </div> : <p></p>
                    }

                    { 
                        selectedVolunteer === null ?
                            <p></p> :
                            <>
                            <p>{`The user ${selectedVolunteer.name} was chosen`}</p>
                            <button onClick={complete}>Complete Task!</button>
                            </>
                    }


                    {(!isCreator() && !isVolunteer()) &&
                        <p className="I-can-help pointer" onClick={onIcanHelp}>I CAN HELP</p>
                    }
                    {(isVolunteer()) &&
                        <p>YOU ARE VOLUNTEER HERE</p>
                    }
                </div>}
            </div>
        </div>
    );
}

export default PostDetails;