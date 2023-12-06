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
	const handleSearch = (searchValue) => {
		const helpPostsUpdated = helpPostsArr.filter((eachHelpPost) => {
			console.log(eachHelpPost.title)
			return eachHelpPost.title.includes(searchValue)
		})
		if (searchValue === "") {
			const BACKEND_ROOT = import.meta.env.VITE_SERVER_URL;
			fetch(`${BACKEND_ROOT}/api/home`)
				.then((res) => res.json())
				.then((resJson) => { setHelpPostsArr(resJson); })
				.catch((err) => console.log(err));
		} else {
			const helpPostsUpdated = helpPostsArr.filter((eachHelpPost) =>
				eachHelpPost.title.toLowerCase().includes(searchValue.toLowerCase())
			);

			setHelpPostsArr(helpPostsUpdated);
		}
	}

	useEffect(() => {
		const BACKEND_ROOT = import.meta.env.VITE_SERVER_URL;
		fetch(`${BACKEND_ROOT}/api/home`)
			.then((res) => res.json())
			.then((resJson) => { setHelpPostsArr(resJson); })
			.catch((err) => console.log(err));
	}, []);

	return (
		<div className="home-page-container">

			<div id="home-content-wrapper">

				<div className="home-head">
					<p className="home-title">How can you help today?</p>
					<br />
					<div className="search-bar">
						<input onChange={(event) => handleSearch(event.target.value)} type="text" name="search-input" id="search-input" />
						<span> {''} {''}   <i class="fa fa-search"></i></span>



					</div>
				</div>
				{
					helpPostsArr.map((eachPost, index) => {
						console.log("post ", eachPost);
						return (
							<div key={index} className="posts-container">

								<HelpPostHome  post={eachPost} />
							</div>
						);
					})
				}
			</div>
		</div>
	);
}

export default HomePage;
