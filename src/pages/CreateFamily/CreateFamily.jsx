import "./CreateFamily.css";
import {useState} from'react'
function CreateFamily() {
    const [familyName, setFamilyName] = useState("")
    const handleSubmit = async (event) =>{
        event.preventDefault()
        console.log(familyName)

try {
     await fetch(`${import.meta.env.VITE_SERVER_URL}/fam/create`, {
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


            <button type="submit">Create family</button>
        </form>
    )
}
export default CreateFamily;