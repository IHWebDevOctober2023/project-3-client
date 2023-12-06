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
  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append("userPicture", e.target.files[0]);
    uploadData.append("userId", user._id);
    service
      .uploadUserImage(uploadData)
      .then(response => {
        setImageUrl(response.fileUrl);
        setUser({ ...user, userPicture: response.fileUrl })
      })
      .catch(err => console.log("Error while uploading the file: ", err));
  };
  return (
    <>
      <Navbar />
      <div className="form-createtask-container">
        <div className="user-profile-container">
          <h2 className="text-h2">Hello {user.name.charAt(0).toUpperCase() + user.name.slice(1)}!</h2>
          <p className="text-p"><span> <i class="fa-solid fa-envelope"></i></span> : {user.email} </p>
          <p className="text-p"><span><i class="fa-solid fa-poo"></i></span> : {user.role} </p>
          <img src={user.userPicture} alt={user.name} />
          <div className="upload" >
            <form> <input onChange={(e) => handleFileUpload(e)} type="file" />  </form>
          </div>
        </div>
        <div className="family-container">
          <p className="text-p">{family.familyName} Secret Code: {family.familyCode} </p>
          <p className="text-p">Send this code to join new member</p>
          {<img src={family.familyPicture} alt="Family" />}
          <p className="text-p">Your {family.familyName.charAt(0).toUpperCase() + family.familyName.slice(1)} parents: </p>
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
