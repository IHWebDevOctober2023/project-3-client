import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import "./CreateFamily.css";
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";


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
            <Navbar />
            <br></br>
            <h1>Hello {user.name.charAt(0).toUpperCase() + user.name.slice(1)}!</h1>
            <h2>Welcome to <span className="app-name">Kiddie tasks hero</span>!</h2>
            <br></br>
            <h2>Now you can:</h2>
            <br></br>
            {
                (user.role === "Parent") && /* with this "middleware" we can avoid users under 18 to create a new family */
                <form onSubmit={familySubmit} className="form-container">
                    <h2>Create a new family:</h2>
                    <input className="input" type="text" placeholder="Type your family name" name="familyName" onChange={(event) => setFamilyName(event.target.value)} />

                    {/*             <label htmlFor="familyPicture">family pic</label>
            <input type="text" /> */}
                    <button className="btn-icon1"><i class="fa-solid fa-people-group"></i></button>

                </form>
            }
            {/* create a new form for the user to be part os a family */}
            <br></br>
            <form onSubmit={joinFamily} className="form-container">
                <label htmlFor=""></label>
                <h2>Join an existing family:</h2>
                <input className="input" type="number" placeholder="type your family code here" name="familyCode" value={familyCode} onChange={(event) => setFamilyCode(event.target.value)} />
                <button className="btn-icon1"><i class="fa-solid fa-people-roof"></i></button>
            </form>
        </>
    )
}
export default CreateFamily;