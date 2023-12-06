import "./CreateTestimonyPage.css";
import { useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { useContext } from "react";
import { Rating } from 'react-simple-star-rating';
import { useNavigate } from "react-router-dom";

function CreateTestimonyPage() {
	const navigate = useNavigate();
    const [testimonies, setTestimonies] = useState([]);
    const [text, setText] = useState('')
    const [rating, setRating] = useState(0)
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
    const userId = user._id;

	// Catch Rating value
	const handleRating = (rate) => {
	setRating(rate);

	// other logic
	}

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
            setTestimonies((previousTestimony) => [newTestimony, ...previousTestimony]);
			navigate("/home");

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="form-page">
            <h1>Create Testimony</h1>
            <form onSubmit={(event) => postData(event)}>
                <label htmlFor="text">Do you like our app?</label>
				<textarea placeholder="Your text here" value={text} onChange={(event) => setText(event.target.value)} name="text" id="text" rows="5"></textarea>
                <Rating onClick={handleRating} />
                <button className="submitbutton" type="submit">Send</button>
            </form>
        </div>
    );
}

export default CreateTestimonyPage;