import "./Testimony.css";

const Testimony = (props) => {
    const {text, rating, creator} = props;

    return (
        <article className="testimony">
            <p>text: {text}</p>
            <p>rating: {rating}</p>
            <p>user: {creator}</p>
        </article>
    );
};

export default Testimony;