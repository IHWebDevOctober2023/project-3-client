import './EditProfile.css'
//import service from "../../services/file-upload.service";
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
  const userIdFromAuth = user._id
  const navigate = useNavigate()

  useEffect(() => {
    /* service. */fetch(`http://localhost:5005/user/${userIdFromAuth}`)
      .then((response) => {
        return response.json();
      })
      .then((responsejson) => {
        console.log("este es el responsejson", responsejson)
        setLocation(responsejson.location)
        setProfilePicture(responsejson.profilePicture)
        setSkills(responsejson.skills)
        setDescription(responsejson.description)
      })
      .catch((err) => console.log(err))
  }, [])

  /*  const handleFileUpload = (e) => {
     // console.log("The file to be uploaded is: ", e.target.files[0]);
  
     const uploadData = new FormData();
  
     // imageUrl => this name has to be the same as in the model since we pass
     // req.body to .create() method when creating a new movie in '/api/movies' POST route
     uploadData.append("helpImageUrl", e.target.files[0]);
  
     service
       .uploadImage(uploadData)
       .then(response => {
         console.log("response is: ", response);
         // response carries "fileUrl" which we can use to update the state
         setHelpImageUrl(response.fileUrl);
       })
       .catch(err => console.log("Error while uploading the file: ", err));
   }; */

  const putData = (event) => {
    event.preventDefault();
    /* service. */
    const updatedUser = {
      location,
      profilePicture,
      skills,
      description,
      id: user._id
    };
    setUserPut(updatedUser)



    const BACKEND_ROOT = import.meta.env.VITE_SERVER_URL;
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
          <textarea placeholder="location" value={location} onChange={(event) => setLocation(event.target.value)} type="textarea" name="location" />
          <br />


          <label htmlFor="profilePicture">Profile Picture: </label>
          <input type="text" name="profilePicture" onChange={(event) => setProfilePicture(event.target.value)} />
         



          {/* <input value={profilePicture} onChange={(event) => setProfilePicture(event.target.value)} type="file" name="profilePicture" /> */}

          <br />
          <label htmlFor="skills">Skills: </label>
          <textarea value={skills} onChange={(event) => setSkills(event.target.value)} type="textarea" name="skills" />
          <br />
          <label htmlFor="description">Description: </label>
          <textarea value={description} onChange={(event) => setDescription(event.target.value)} type="textarea" name="description" />
          <br />
          <button type="submit">Send</button>
        </div>
      </form>
    </div >
  );
}

export default EditProfile;