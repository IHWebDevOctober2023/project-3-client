import "./Testimony.css";

const Testimony = (props) => {
    const {text, rating, creator} = props;
    console.log("CREATOR:", creator);


    return (
        <article className="testimony">
            <p>text: {text}</p>
            <p>rating: {rating}</p>
            <p>user: {creator.name}</p>
        </article>
    );
};

export default Testimony;