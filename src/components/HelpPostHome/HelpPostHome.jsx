import { Link } from "react-router-dom";

import "./HelpPostHome.css";

const HelpPostHome = (props) => {
	const {_id, title, location, description, creator} = props.post;
	console.log("creator",creator)

	return (
		
		
		
		<Link to={`/help-post/${_id}`} >
		<div  className="help-post-home">
			<p className="title">{title}</p>
			<div className="image-location-container">

			<img className="home-creator-picture" src={creator.profilePicture} alt="" />
			<p className="location">{location} <i className="fa fa-map-marker"></i></p>
			</div>
			<p className="description">{description}</p>
		</div>
		</Link>
		
		
	);
};

export default HelpPostHome;