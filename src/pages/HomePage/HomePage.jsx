import { useEffect, useState } from "react";
import HelpPostHome from "../../components/HelpPostHome/HelpPostHome";
import "./HomePage.css";

function HomePage() {
	const [helpPostsArr, setHelpPostsArr] = useState([]);

/* 	const renderHelpPost = (helpPostsArr) => {
		console.log("in");
		helpPostsArr.map((eachPost, index) => {
			console.log("post ", index);
			return ( <HelpPostHome key="index" />);
		})
	 }; */

	useEffect(()=>{
		const BACKEND_ROOT = import.meta.env.VITE_SERVER_URL;
		fetch(`${BACKEND_ROOT}/api/home`)
		.then((res) => res.json())
		.then((resJson) => {setHelpPostsArr(resJson);})
		.catch((err) => console.log(err));
	}, []);

  return (
    <div id="home-content-wrapper">
		<p className="home-title">How can I help today?</p>
		<div className="search-bar">
                <input onChange={(event)=>handleSearch(event.target.value)} type="text" name="search-input" id="search-input" />
                <span> {''} {''}   🔍</span>
                
            </div>
		{ 
			helpPostsArr.map((eachPost, index) => {
				console.log("post ", eachPost);
				return ( 
					<div key="index" className="posts-container">
				<HelpPostHome  key={index} post={eachPost}/>
				</div>
				);
			})
		}
    </div>
  );
}

export default HomePage;
