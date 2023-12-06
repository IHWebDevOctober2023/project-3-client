import "./CreateTestimonyPage.css";
import { useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { useContext } from "react";

function CreateTestimonyPage() {

    const [testimonies, setTestimonies] = useState([]);
    const [text, setText] = useState('')
    const [rating, setRating] = useState('')
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
    const userId = user._id;


    const postData = async (event) => {
        event.preventDefault();
        const testimonies = {
            text,
            rating,
            creator:userId,
        };
        console.log(typeof(userId))
        console.log(user)
        console.log(testimonies);
        
        try {
            const response = await fetch("http://localhost:5005/testimonies/createtestimony", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(testimonies),
            });
            
            const newTestimony = await response.json();
            setTestimonies((previousTestimony) => [newTestimony, ...previousTestimony])

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="form-page">
            <h1>Create Testimony</h1>
            <form onSubmit={(event) => postData(event)}>
                <label htmlFor="text">Text</label>
                <input placeholder="Do you like our app?" value={text} onChange={(event) => setText(event.target.value)} type="text" name="text" id="text"/>
                <label htmlFor="rating">Rating</label>
                <input value={rating} onChange={(event) => setRating(event.target.value)} type="number" name="rating" id="rating" />
                <button className="submitbutton" type="submit">Send</button>
            </form>
        </div>
    );
}

export default CreateTestimonyPage;