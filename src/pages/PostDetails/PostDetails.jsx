import "./PostDetails.css";
import { useEffect, useState } from "react";
import { Navigate, redirect, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { useContext } from "react";

function PostDetails() {
    const { helpId } = useParams();
    console.log("helpId",helpId)
    const [helpData, setHelpData] = useState('')

    useEffect(() => {
        fetch(`http://localhost:5005/user/${helpId}`)
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
        </div>
    );
}

export default PostDetails;