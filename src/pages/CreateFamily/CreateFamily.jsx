import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import "./CreateFamily.css";
import { useState } from 'react'


function CreateFamily() {
    const { user } = useContext(AuthContext);
    const [familyName, setFamilyName] = useState("")
    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log(familyName)

        try {
            await fetch(`${import.meta.env.VITE_SERVER_URL}/family/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ familyName: familyName, userId: user._id })
            });


        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Family name:</label>
            <input type="text" name="familyName" onChange={(event) => setFamilyName(event.target.value)} /><br></br>

            {/*             <label htmlFor="familyPicture">family pic</label>
            <input type="text" /> */}
                <button>create family</button>
           
        </form>
    )
}
export default CreateFamily;