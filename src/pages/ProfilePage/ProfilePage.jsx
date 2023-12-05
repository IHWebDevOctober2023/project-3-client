import "./ProfilePage.css";
import FamilyMember from "../../components/FamilyMember/FamilyMember";
import { useState } from 'react'
import { AuthContext } from "../../context/auth.context";
import { useContext } from "react";
import { useEffect } from "react";
import service from "../../services/file-upload.service";
import Navbar from "../../components/Navbar/Navbar";

function ProfilePage() {
  const [familyMember, setfamilyMember] = useState([])
  const { user, family, setUser } = useContext(AuthContext);
  const [imageUrl, setImageUrl] = useState(user.userPicture);

  const getFamilyId = async (event) => {
    try {
      const familyMembersResponse = await fetch(`${import.meta.env.VITE_SERVER_URL}/family/familymembers/${family._id}`)
      const familyMembers = await familyMembersResponse.json()
      console.log(familyMembers);
      setfamilyMember(familyMembers)
    } catch (error) { console.log(error); }
  }
  useEffect(() => {
    getFamilyId()
  }, [imageUrl])


  // ******** this method handles the file upload ********
  const handleFileUpload = (e) => {
    /* console.log("The file to be uploaded is: ", e.target.files[0]); */
    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append("userPicture", e.target.files[0]);
    uploadData.append("userId", user._id); // Adding el userId al FormData   
    /* console.log("userId", user._id); */
    service
      .uploadUserImage(uploadData)
      .then(response => {
        /* console.log("response is: ", response); */
        // response carries "fileUrl" which we can use to update the state
        setImageUrl(response.fileUrl);
        setUser({ ...user, userPicture: response.fileUrl })
      })
      .catch(err => console.log("Error while uploading the file: ", err));
  };



  return (
    <>
    <Navbar/>
    <div className="form-createtask-container">
      <div className="user-profile-container">

      <h2 className="text-profile">Hello {user.name.charAt(0).toUpperCase() + user.name.slice(1)}!</h2>
      <p><span> <i class="fa-solid fa-envelope"></i></span> : {user.email} </p>
      <p><span><i class="fa-solid fa-poo"></i></span> : {user.role} </p>
      <img src={user.userPicture} alt={user.name} />
      <div className="upload" >
      <form> <input onChange={(e) => handleFileUpload(e)} type="file"/>  </form>
      </div>
      </div>
      <div className="family-container">
      <p> 🤫 {family.familyName} Secret Code: {family.familyCode} </p>
      <p>ℹ️ Send this code to join new member</p>
      { <img src={family.familyPicture} alt="Family" /> }
      <h2 className="text-profile">Your {family.familyName.charAt(0).toUpperCase() + family.familyName.slice(1)} parents: </h2>
      <div className="family-members-container">
        {familyMember.map((eachFamilyMember, index) => {
          return (
            <FamilyMember
            key={eachFamilyMember._id}
            img={eachFamilyMember.userPicture}
            name={eachFamilyMember.name}
            age={eachFamilyMember.age}
            role={eachFamilyMember.role}

            />)
          })
        }
        </div>
      </div>
    
    </div>
    </>
    )
      }
export default ProfilePage;
