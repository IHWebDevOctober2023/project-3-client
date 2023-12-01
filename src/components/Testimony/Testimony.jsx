import "./Testimony.css";

const Testimony = (props) => {
    const {text, rating, creator} = props;
    
    const setStars = (rating) => {
        let stars = "";
        for (let i = 0; i < rating; i++) {
            stars += "★";
        }
        for (let i = 0; i < 5 - rating; i++) {
            stars += "☆";
        }
        return (stars);
    }

    return (
        <article className="testimony">
            <p className="quote">{text}</p>
                
                <div className="testimony-creator">
                <img src={creator.profilePicture} alt={creator.name} />
                <p>{creator.name}</p>
                <p>{setStars(rating)}</p>
                </div>
        </article>
    );
};

export default Testimony;