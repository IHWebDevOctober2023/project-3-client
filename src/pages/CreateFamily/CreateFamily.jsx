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
            <div className="form-createtask-container">
            <h2 className="text-h2">Hello {user.name.charAt(0).toUpperCase() + user.name.slice(1)}!</h2>
            <h3 className="text-h3">Welcome to <span className="app-name">Kiddie tasks hero</span>!</h3>

            <h3 className="text-h3">Now you can:</h3>

            {
                (user.role === "Parent") && /* with this "middleware" we can avoid users under 18 to create a new family */
                <form onSubmit={familySubmit} className="form-container">
                    <h3 className="text-h3">Create a new family:</h3>
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
                <h3 className="text-h3">Join an existing family:</h3>
                <input className="input" type="number" placeholder="type your family code here" name="familyCode" value={familyCode} onChange={(event) => setFamilyCode(event.target.value)} />
                <button className="btn-icon1"><i class="fa-solid fa-people-roof"></i></button>
            </form>
            </div>
        </>
    )
}
export default CreateFamily;