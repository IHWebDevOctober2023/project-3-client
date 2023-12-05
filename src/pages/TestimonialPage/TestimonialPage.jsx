import "./TestimonialPage.css";
import { useEffect, useState } from "react";
import Testimony from "../../components/Testimony/Testimony";

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
                    return (

                        <div className="testimonies-container">

                            <Testimony key={index} post={eachTestimony} />
                        </div>
                    );
                })
            }
        </div>
    );
}

export default TestimonialPage;