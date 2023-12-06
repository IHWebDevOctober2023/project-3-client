import "./TestimonialPage.css";
import { useEffect, useState } from "react";
import Testimony from "../../components/Testimony/Testimony";
import TestimonyTestimonialPage from "../../components/TestimonyTestimonialPage/TestimonyTestimonialPage";

function TestimonialPage() {
    const [testimoniesArray, setTestimoniesArray] = useState([])

    useEffect(() => {
        const BACKEND_ROOT = import.meta.env.VITE_SERVER_URL;
        fetch(`${BACKEND_ROOT}/testimonies/alltestimonies`)
            .then((res) => res.json())
            .then((resJson) => {
                setTestimoniesArray(resJson);
                console.log("resJson", resJson);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div>
            <h1>Testimonial Page</h1>
            {
                testimoniesArray.map((eachTestimony, index) => {
                    console.log("post ", eachTestimony);
                    const { text, rating, creator } = eachTestimony;
                    return (
                        <div key={index} id="alltestimonies-testimonies-container" >
                            <TestimonyTestimonialPage id="alltestimonies-testimonies" text={text} rating={rating} creator={creator} />
                        </div>
                    );
                })
            }
        </div>
    );
}

export default TestimonialPage;