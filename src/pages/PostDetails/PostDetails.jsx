import "./PostDetails.css";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { useContext } from "react";
import VolunteerCard from "../../components/VolunteerCard/VolunteerCard";

function PostDetails() {
    const { user } = useContext(AuthContext);
    const { helpId } = useParams();
    const BACKEND_ROOT = import.meta.env.VITE_SERVER_URL;
    const navigate = useNavigate()
    const [helpData, setHelpData] = useState('')
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
		//console.log("VOLUNTEERS: ", helpData.foundHelpPost.volunteers, "USERID: ", user._id );
        if (helpData.foundHelpPost.volunteers.find( element => element._id === user._id)) {
            //console.log("is volunteer");
            return true;
        }
        else {
			//console.log("is NOT volunteer");
            return false;
        }
    };

	const isSelectedVolunteer = () => {
		console.log("SELECTEDVOLUNTEER\nuser._id: ", user._id, "helpData.foundHelpPost.volunteers: ", helpData.foundHelpPost.selectedVolunteer);
        if (helpData.foundHelpPost.selectedVolunteer && user._id === helpData.foundHelpPost.selectedVolunteer._id) {
            console.log("is selectedVolunteer");
            return true;
        }
		else {
			console.log("is NOT selectedVolunteer");
			return false;
		}
	}

	const isCompleted = () => {
		console.log("ISCOMPLETED: ", helpData.foundHelpPost.isCompleted);
		return helpData.foundHelpPost.isCompleted;
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
				setStuff();
                //console.log("MESSAGE: ", resJson.message);
            })
    }

    useEffect(() => {
        setStuff()
    }, [])

    const deleteHelp = () => {
        fetch(`${BACKEND_ROOT}/help-post/edithelp/${helpId}`,
            {
                method: "DELETE",
				mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                if (response.ok) {
                    //throw new Error('Could not delete help')
                    navigate("/home")
                }
            })
            .catch((err) => console.log(err))
    }

    const complete = () => {
        const reqBody = {
			volunteerId: helpData.foundHelpPost.selectedVolunteer._id,
            postId: helpData.foundHelpPost._id
        };
		console.log("COMPLETE BTN", user._id, helpData.foundHelpPost._id);
        fetch(`${BACKEND_ROOT}/help-post/setcompleted`, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reqBody),
        })
		.then(() => setStuff())
		.catch((err) => console.error(err));
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

                    {(isCreator() && !isCompleted()) &&
                        <div className="edit-help-buttons">
                            <Link to={`/edithelp/${helpId}`}>
                                <p className="edit-button">EDIT POST</p>
                            </Link>

                            <p onClick={deleteHelp} className="edit-button">DELETE POST</p>

                        </div>
                    }

                    <p className="volunteer"></p>
                    {(volunteersArray.length > 0 && isCreator()) ?
                        <div>
                            <p className="details-volunteer">  Volunteers: </p>
                            {volunteersArray.map((eachVolunteer, index) => {
                                //console.log(eachVolunteer);
                                //console.log(helpId)
                                return (<VolunteerCard key={index} volunteer={eachVolunteer} postId={helpId} setStuff={setStuff} />)
                            })}
                        </div> : <p></p>
                    }

                    { 
                        selectedVolunteer === null ?
                            <p></p> : ( <>
                            {(isCreator() && !isCompleted())&&
							<>
                                <p>{`The user ${selectedVolunteer.name} was chosen`}</p>
                                <button onClick={complete}>Complete Task!</button>
                            </>
							}
							{isSelectedVolunteer() &&
                                <p>You were chosen to help. Thanks!</p>
							}
							</>)
                    }

					{
						isCompleted() && 
						<p>THIS HELP IS ALREADY COMPLETED</p>
					}

                    {(!isCreator() && !isVolunteer() && !isSelectedVolunteer()) &&
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