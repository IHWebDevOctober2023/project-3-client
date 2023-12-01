import "./PostDetails.css";
import { useEffect, useState } from "react";
import { Navigate, redirect, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { useContext } from "react";

function PostDetails() {
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
    const { helpId } = useParams();
    const [helpData, setHelpData] = useState('')
    console.log("helpdata",helpData)

    useEffect(() => {
        fetch(`http://localhost:5005/help-post/${helpId}`)
        .then((response) => {
            return response.json();
        })
        .then((jsonData) => {
            setHelpData(jsonData);
        })
        .catch((err)=>console.log(err))

    },[])

    return (
        <div>
            <h1>Post Details</h1>
            <h3>{helpData.title}</h3>
            <p>{helpData.location}</p>
            <p>{helpData.description}</p>
            <img  className="help-image" src={helpData.helpImageUrl} alt="" />
            
            <p>{user.name}</p>
            <p>{helpData.catergory}</p>
        </div>
    );
}

export default PostDetails;