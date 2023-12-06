import { Link, useNavigate } from "react-router-dom";

import "./VolunteerCard.css";
import { useState } from "react";

const VolunteerCard = (props) => {
    const navigate = useNavigate();
    const { _id, location, email, name, profilePicture } = props.volunteer;
    const postId = props.postId;
    const setStuff = props.setStuff
    console.log(props);
    //const setReload = props.setReload;
    //console.log(_id);


    const chooseVolunteer = () => {
        navigate(`/help-post/${postId}`);
        const reqBody = {
            volunteerId: _id,
            postId
        }
        console.log(reqBody);
        const BACKEND_ROOT = import.meta.env.VITE_SERVER_URL;
        fetch(`${BACKEND_ROOT}/help-post/selectvolunteer`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reqBody),

        })
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                setStuff();
            })
            .catch((error) => (console.error(error)));

        



    }

    return (
        <>
            <div className="volunteerCard-link">
                <Link to={`/user/${_id}`} >
                    <div className="volunteerCard-card" >
                        <img className="image-volunteerCard" src={profilePicture} alt="" />
                        <p className="email-volunteerCard">Email: {email}</p>
                        {location === undefined ? <p></p> : <p className="location-volunteerCard">Location: {location}</p>}
                        <p className="name-volunteerCard">Name: {name}</p>
                    </div>
                </Link>
                <button onClick={chooseVolunteer}>Choose this volunteer!!</button>
            </div>
        </>
    );
};

export default VolunteerCard;