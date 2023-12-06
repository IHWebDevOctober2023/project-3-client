import './EditProfile.css'
import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from '../../context/auth.context';

function EditProfile() {
  const [userPut, setUserPut] = useState('')
  const [location, setLocation] = useState('')
  const [profilePicture, setProfilePicture] = useState('')
  const [skills, setSkills] = useState('')
  const [description, setDescription] = useState('')
  const [helpImageUrl, setHelpImageUrl] = useState("");

  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const BACKEND_ROOT = import.meta.env.VITE_SERVER_URL;
  const userIdFromAuth = user._id
  const navigate = useNavigate()


  useEffect(() => {
    fetch(`${BACKEND_ROOT}/user/${userIdFromAuth}`)
      .then((response) => {
        return response.json();
      })
      .then((responsejson) => {
        setLocation(responsejson.location)
        setProfilePicture(responsejson.profilePicture)
        setSkills(responsejson.skills)
        setDescription(responsejson.description)
      })
      .catch((err) => console.log(err))
  }, [])
  const putData = (event) => {
    event.preventDefault();
    const updatedUser = {
      location,
      profilePicture,
      skills,
      description,
      id: user._id
    };
    setUserPut(updatedUser)




    fetch(`${BACKEND_ROOT}/user/edituser`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    })
      .then((response) => {
        return response.json();
      },
        { mode: 'cors' })
      .then((editedUser) => {
        setUserPut(editedUser)
        console.log(editedUser)
        navigate("/myprofile")
      })
      .catch((err) => (console.log(err)));
  }


  return (
    <div>
      <h1>Edit my profile</h1>
      <form onSubmit={(event) => putData(event)}>
        <div className='edit-profile-container'>
          <label htmlFor="location">Location: </label>
          <textarea type="textarea" name="location" value={location} onChange={(event) => setLocation(event.target.value)} />
          <br />
          <label htmlFor="profilePicture">Profile Picture: </label>
          <textarea type="textarea" name="profilePicture" value={profilePicture} onChange={(event) => setProfilePicture(event.target.value)} />
          <br />
          <label htmlFor="skills">Skills: </label>
          <textarea type="textarea" name="skills" value={skills} onChange={(event) => setSkills(event.target.value)} />
          <br />
          <label htmlFor="description">Description: </label>
          <textarea type="textarea" name="description" value={description} onChange={(event) => setDescription(event.target.value)} />
          <br />
          <button type="submit">Send</button>
        </div>
      </form>
    </div >
  );
}

export default EditProfile;