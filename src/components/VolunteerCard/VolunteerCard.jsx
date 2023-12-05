import { Link } from "react-router-dom";

import "./VolunteerCard.css";

const VolunteerCard = (props) => {
    const { _id, location, email, name, profilePicture } = props.volunteer;
    const postId = props.helpId;
    console.log(_id);


    const chooseVolunter = () => {
        const reqBody = {
            volunteerId: _id,
            postId
        }
        const BACKEND_ROOT = import.meta.env.VITE_SERVER_URL;
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
        <>
            <div className="volunteerCard-link">
                <Link to={`/user/${_id}`} >
                    <div className="volunteerCard-card" >
                        <p className="email-volunteerCard">Email: {email}</p>
                        {location === undefined ? <p></p> : <p className="location-volunteerCard">Location: {location}</p>}
                        <p className="name-volunteerCard">Name: {name}</p>
                        <img className="image-volunteerCard" src={profilePicture} alt="" />
                    </div>
                </Link>
                <button onClick={chooseVolunter}>Choose this volunteer!!</button>
            </div>
        </>
    );
};

export default VolunteerCard;