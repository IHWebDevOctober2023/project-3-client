import { Link, Navigate } from "react-router-dom";
import "./CreateFamily.css";
import {useState} from'react'


function CreateFamily() {
    const [familyName, setFamilyName] = useState("")
    const handleSubmit = async (event) =>{
        event.preventDefault()
        console.log(familyName)

try {
     await fetch(`${import.meta.env.VITE_SERVER_URL}/family/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({familyName: familyName})
    });
    
    
} catch (error) {
    console.log(error)
}
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Family name:</label>
            <input type="text" name="familyName" onChange={(event) => setFamilyName(event.target.value)}/>

            <label htmlFor="familyPicture">family pic</label>
            <input type="text" />

            <Link to="/">create a family</Link>
        </form>
    )
}
export default CreateFamily;