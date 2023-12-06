import "./TestimonyTestimonialPage.css";

const TestimonyTestimonialPage = (props) => {
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
        <article className="testimony-testimonial">
            <p className="quote-testimonial">{text}</p>
                
                <div className="testimony-creator-testimonial">
                <img src={creator.profilePicture} alt={creator.name} />
                <p>{creator.name}</p>
                <p className="testimony-rating-testimonial">{setStars(rating)}</p>
                </div>
        </article>
    );
};

export default TestimonyTestimonialPage;