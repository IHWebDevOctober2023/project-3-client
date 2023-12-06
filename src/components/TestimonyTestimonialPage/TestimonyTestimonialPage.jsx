import "./TestimonyTestimonialPage.css";

const TestimonyTestimonialPage = (props) => {
    const { text, rating, creator } = props;

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

            <div className="testimony-creator-testimonial">
                <img src={creator.profilePicture} alt={creator.name} />
                <p className="creator-name">{creator.name}</p>
            </div>
                <p className="quote-testimonial">{text}</p>
            <p className="testimony-rating-testimonial">{setStars(rating)}</p>
        </article>
    );
};

export default TestimonyTestimonialPage;