import { Link } from "react-router-dom";

import "./VolunteerCard.css";

const VolunteerCard = (props) => {
    const { _id, location, email, name, profilePicture } = props.post;
    console.log(location);

    return (
        <>
            <Link to={`/help-post/${_id}`} className="volunteerCard-link">
                <div className="volunteerCard-card" >
                    <p className="email-volunteerCard">Email: {email}</p>
                    {location === undefined ? <p></p> : <p className="location-volunteerCard">Location: {location}</p>}
                    <p className="name-volunteerCard">Name: {name}</p>
                    <img className="image-volunteerCard" src={profilePicture} alt="" />
                </div>
            </Link>
        </>
    );
};

export default VolunteerCard;