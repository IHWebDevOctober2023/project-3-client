import { useNavigate } from "react-router-dom";
import Testimony from "../../components/Testimony/Testimony";
import "./LandingPage.css";

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-wrapper">
        <h3>LANDING</h3>
            <section id="landing-upper">
                <div id="landing-cta">
                    <h2>Do you need help? 3 helps for you are on us.</h2>
                    <button onClick={ () => navigate("/signup")} className="cta-click">Get my free helps!</button>
                </div>
            </section>
        {/* In backend I need to populate creator and send it populated to frontend */}
            <section id="landing-testimonies">
                <Testimony text="My Random Text" rating={5} creator={{name: "Pepito"}}/>

            </section>
        </div>
    );
}

export default LandingPage;