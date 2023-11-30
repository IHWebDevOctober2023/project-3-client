import "./CreateTestimonyPage.css";
import { useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { useContext } from "react";

function CreateTestimonyPage() {

    const [testimonies, setTestimonies] = useState([]);
    const [text, setText] = useState()
    const [rating, setRating] = useState()
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
    


    const postData = async (event) => {
        event.preventDefault();
        const testimonies = {
            text,
            rating,
            creator:user._id
        };
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
        <div>
            <h1>Create Testimony Page</h1>
            <form onSubmit={(event) => postData(event)}>
                <label htmlFor="text">Text</label>
                <input placeholder="Do you like our app?" value={text} onChange={(event) => setText(event.target.value)} type="text" name="text" />
                <label htmlFor="rating">Rating</label>
                <input value={rating} onChange={(event) => setRating(event.target.value)} type="text" name="rating" />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default CreateTestimonyPage;