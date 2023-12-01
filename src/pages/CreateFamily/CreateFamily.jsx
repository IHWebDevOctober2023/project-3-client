import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import "./CreateFamily.css";
import { useState } from 'react'
import { useNavigate } from "react-router-dom";


function CreateFamily() {
    const { user, setFamily } = useContext(AuthContext);
    const [familyName, setFamilyName] = useState("")
    const [familyCode, setFamilyCode] = useState("")
    const navigate = useNavigate()

    const familySubmit = async (event) => {
        event.preventDefault()
        console.log("createFamily page: ", familyName)

        try {
            const family = await fetch(`${import.meta.env.VITE_SERVER_URL}/family/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ familyName: familyName, userId: user._id })
            });
            const jsonFamily = await family.json()
            setFamily(jsonFamily)
            navigate("/")
            
            
        } catch (error) {
            console.log(error)
        }
    }
    const joinFamily = async (event) => {
        event.preventDefault()
        try {
            const family = await fetch(`${import.meta.env.VITE_SERVER_URL}/family/join`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ familyCode: familyCode, userId: user._id })
            })
            const jsonFamily = await family.json()
            setFamily(jsonFamily)
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {
                (user.role === "Parent") && /* with this "middleware" we can avoid users under 18 to create a new family */
                <form onSubmit={familySubmit}>
                    <label>Family name:</label>
                    <input type="text" name="familyName" onChange={(event) => setFamilyName(event.target.value)} /><br></br>

                    {/*             <label htmlFor="familyPicture">family pic</label>
            <input type="text" /> */}
                    <button>create family</button>


                </form>
            }
            {/* create a new form for the user to be part os a family */}
            <form onSubmit={joinFamily}>
                <label htmlFor=""></label>
                <input type="number" name="familyCode" value={familyCode} onChange={(event) => setFamilyCode(event.target.value)} />
                <button>join a family</button>
            </form>
        </>
    )
}
export default CreateFamily;