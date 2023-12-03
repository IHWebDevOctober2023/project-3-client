import { Link } from "react-router-dom";

import "./HelpPostHome.css";

const HelpPostHome = (props) => {
	const {_id, title, location, description} = props.post;

	return (
		
		<Link to={`/help-post/${_id}`} className="help-post-home">
		<div >
			<p className="title">{title}</p>
			<p className="location">Location: {location}</p>
			<p className="description">{description}</p>
		</div>
		</Link>
		
	);
};

export default HelpPostHome;