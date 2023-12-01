import './EditProfile.css'
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/auth.context';

function EditProfile() {
  const [userPut, setUserPut] = useState('')
  const [location, setLocation] = useState('')
  const [profilePicture, setProfilePicture] = useState('')
  const [skills, setSkills] = useState('')
  const [description, setDescription] = useState('')
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const userIdFromAuth = user._id

  useEffect(() => {
    fetch(`http://localhost:5005/user/${userIdFromAuth}`)
        .then((response) => {
            return response.json();
        })
        .then((responsejson)=>{
          console.log("este es el responsejson",responsejson)
          setLocation(responsejson.location)
          setProfilePicture(responsejson.profilePicture)
          setSkills(responsejson.skills)
          setDescription(responsejson.description)
          })
        .catch((err)=>console.log(err))
},[])



  const putData = (event) => {
    event.preventDefault();
    const userPut = {
      location,
      profilePicture,
      skills,
      description,
      id: user._id,
    };


    fetch("http://localhost:5005/user/edituser", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userPut),
    })
      .then((response) => {
        return response.json();
      })
      .then((editedUser) => {
        setUserPut(editedUser)
        console.log(editedUser)
      })
      .catch((err) => (console.log(err)));
  }

  return (
    <div>
      <h1>Edit my profile</h1>
      <form onSubmit={(event) => putData(event)}>
        <label htmlFor="location">Location: </label>
        <textarea placeholder="location" value={location} onChange={(event) => setLocation(event.target.value)} type="textarea" name="location" />
        <br />
        <label htmlFor="profilePicture">Profile Picture: </label>
        <textarea value={profilePicture} onChange={(event) => setProfilePicture(event.target.value)} type="textarea" name="profilePicture" />
        <br />
        <label htmlFor="skills">Skills: </label>
        <textarea value={skills} onChange={(event) => setSkills(event.target.value)} type="textarea" name="skills" />
        <br />
        <label htmlFor="description">Description: </label>
        <textarea value={description} onChange={(event) => setDescription(event.target.value)} type="textarea" name="description" />
        <br />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default EditProfile;