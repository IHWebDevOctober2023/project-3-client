import { Link } from "react-router-dom";
import Testimony from "../../components/Testimony/Testimony";
import "./LandingPage.css";
import { useContext, useEffect, useState } from "react";

const LandingPage = () => {
    const [testimoniesArray, setTestimoniesArray] = useState([]);
    
    useEffect(() => {
        const BACKEND_ROOT = import.meta.env.VITE_SERVER_URL;
        fetch(`${BACKEND_ROOT}/testimonies/landing`, {mode: 'cors'})
            .then((response) => response.json())
            .then ((responseJson) => {
                setTestimoniesArray(responseJson);
                console.log("RESPONSE: ", responseJson);
            })     
            .catch((err)=> console.log(err));
    }, []);

    return (
        <div className="landing-wrapper">
            <section id="landing-upper">
                <div id="landing-cta">
                    <h2>Do you need help? 3 helps for you are on us.</h2>
                    <Link to="/signup"><button className="cta-click">Get my free helps!</button></Link>
                </div>
            </section>
        {/* In backend I need to populate creator and send it populated to frontend */}
            <section id="landing-testimonies">
                {
                    testimoniesArray.map((eachTestimony, index) => {
                        const {text, rating, creator} = eachTestimony;
                        console.log("USER", creator)
                        return (
                            <Testimony key={index} text={text} rating={rating} creator={creator[0]}/>
                        )
                    })
                }
            </section>
        </div>
    );
}

export default LandingPage;