import { Link } from "react-router-dom";

import "./PostCard.css";

const PostCard = (props) => {
	const {_id, title, location, description} = props.post;

	return (
		
		<Link to={`/help-post/${_id}`} className="help-post-link">
		<div className="help-post-card" >
			<p className="title">Title: {title}</p>
			<p className="location">Location: {location}</p>
			<p className="description">Description: {description}</p>
		</div>
		</Link>
		
	);
};

export default PostCard;