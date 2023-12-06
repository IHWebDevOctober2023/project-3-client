import "./CreateHelpForm.css";
import { useEffect, useState, useContext } from 'react'
import { AuthContext } from "../../context/auth.context";
import { Navigate, useNavigate } from "react-router-dom";

function CreateHelpForm() {
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
    const [helpPosts, setHelpPosts] = useState([])
    const [title, setTitle] = useState('')
    const [location, setLocation] = useState('')
    const [description, setDescription] = useState('')
    const [helpImageUrl, setHelpImage] = useState('')
    const [creator, setCreator] = useState('')
    const [volunteers, setVolunteers] = useState('')
    const [isCompleted, setIsCompleted] = useState('')
    const navigate = useNavigate();

    const postHelp = async (event) => {
        event.preventDefault();
        const helpPosts = {
            title,
            location,
            description,
            helpImageUrl,
            creator: user._id,
            volunteers,
            isCompleted
        };
        //console.log(helpPosts);
    
        try {
            const BACKEND_ROOT = import.meta.env.VITE_SERVER_URL;
            const response = await fetch(`${BACKEND_ROOT}/help-post/createhelp`, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(helpPosts),
            });
            const newHelpPost = await response.json();
            setHelpPosts((previousHelpPosts) => [newHelpPost, ...previousHelpPosts]);
            navigate("/myprofile");
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <h1>Create Help Request</h1>
            <div >
            <form className="create-help-container">
                <label htmlFor="title">Title</label>
                <input placeholder="Name your help request" value={title} onChange={(event) => setTitle(event.target.value)} type="text" name="title" id="title"/>

                <label htmlFor="location">Location</label>
                <textarea value={location} onChange={(event) => setLocation(event.target.value)} type="text" name="location" id="location" />

                <label htmlFor="description">Description</label>
                <textarea value={description} onChange={(event) => setDescription(event.target.value)} type="text" name="description" id="description"/>

                <label htmlFor="helpImageUrl">Image</label>
                <input value={helpImageUrl} onChange={(event) => setHelpImage(event.target.value)} type="text" name="helpImageUrl" id="helpImageUrl"/>

                <p onClick={(event) => postHelp(event)} className="create-help-button">CREATE</p>
            </form>
            </div>
        </div>
    );
}

export default CreateHelpForm;