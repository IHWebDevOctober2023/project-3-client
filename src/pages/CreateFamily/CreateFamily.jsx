import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import "./CreateFamily.css";
import { useState } from 'react'
import { Navigate } from "react-router-dom";


function CreateFamily() {
    const { user } = useContext(AuthContext);
    const [familyName, setFamilyName] = useState("")
    const [familyCode, setFamilyCode] = useState("")
    const familySubmit = async (event) => {
        event.preventDefault()
        console.log("createFamily page: ",familyName)

        try {
            await fetch(`${import.meta.env.VITE_SERVER_URL}/family/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ familyName: familyName, userId: user._id })
            });
            Navigate("/")


        } catch (error) {
            console.log(error)
        }
    }
    const joinFamily = async (event) =>{
        event.preventDefault()
        try {
            await fetch(`${import.meta.env.VITE_SERVER_URL}/family/join`, {
                method:"POST",
                headers: {
                    'content-type': 'aplication/json'
                },
                body: JSON.stringify({familyCode: familyCode, userId: user._id})
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
        {
            (user.role === "Parent") &&
        <form onSubmit={familySubmit}>
            <label>Family name:</label>
            <input type="text" name="familyName" onChange={(event) => setFamilyName(event.target.value)} /><br></br>

            {/*             <label htmlFor="familyPicture">family pic</label>
            <input type="text" /> */}
                <button>create family</button>
           

        </form>
        }
        <form onSubmit={joinFamily}>
            <label htmlFor=""></label>
            <input type="number" name="familyCode" value={familyCode} onChange={(event) => setFamilyCode(event.target.value)}/>
            <button>join a family</button>
        </form>
        </>
    )
}
export default CreateFamily;