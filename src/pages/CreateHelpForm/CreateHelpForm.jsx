import "./CreateHelpForm.css";
import { useEffect, useState, useContext } from 'react'
import { AuthContext } from "../../context/auth.context";


function CreateHelpForm() {
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
    const [helpPosts, setHelpPosts] = useState([])
    const [title, setTitle] = useState('')
    const [location, setLocation] = useState('')
    const [description, setDescription] = useState('')
    const [helpImageUrl, setHelpImage] = useState('')
    const [creator, setCreator] = useState('')
    const [category, setCategory] = useState('')
    const [volunteers, setVolunteers] = useState('')
    const [isCompleted, setIsCompleted] = useState('')

    /* useEffect(() => {
        postHelp()
    }, []) */

    const postHelp = async (event) => {
        event.preventDefault();
        const helpPosts = {
            title,
            location,
            description,
            helpImageUrl,
            creator: user._id,
            category,
            volunteers,
            isCompleted
        };
        console.log(helpPosts);
    
        try {
            const BACKEND_ROOT = import.meta.env.VITE_SERVER_URL;
            const response = await fetch(`${BACKEND_ROOT}/help-post/${helpId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(helpPosts),
            }
            , { mode: 'cors' });
            const newHelpPost = await response.json();
            setHelpPosts((previousHelpPosts) => [newHelpPost, ...previousHelpPosts])

        } catch (err) {
            console.log(err);
        }
    }

    

    return (
        <div>
            <h1>Create Help Request</h1>
            <div >
            <form className="create-help-container" onSubmit={(event) => postHelp(event)}>
                <label htmlFor="title">Title</label>
                <input placeholder="Name your help request" value={title} onChange={(event) => setTitle(event.target.value)} type="text" name="title" />

                <label htmlFor="location">Location</label>
                <textarea value={location} onChange={(event) => setLocation(event.target.value)} type="text" name="location" />

                <label htmlFor="Description">Description</label>
                <textarea value={description} onChange={(event) => setDescription(event.target.value)} type="text" name="description" />

                <label htmlFor="helpImageUrl">Image</label>
                <input value={helpImageUrl} onChange={(event) => setHelpImage(event.target.value)} type="text" name="helpImageUrl" />

               

                <label htmlFor="category">Category</label>
                <select value={category} onChange={(event) => setCategory(event.target.value)} type="text" name="category" >
                    <option value="learning">Learning</option>
                    <option value="transport">Transport</option>
                    <option value="tech">Tech</option>
                    <option value="house-chores">House-chores</option>
                    <option value="furniture">Furniture</option>
                    <option value="house-repairs">House-repairs</option>
                    <option value="chat-sessions">Chat-sessions</option>

                </select>


                <p className="create-help-button" type="submit">CREATE</p>
            </form>
            </div>

        </div>
    );
}

export default CreateHelpForm;