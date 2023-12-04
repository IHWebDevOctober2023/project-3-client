import "./ProfilePage.css";
import FamilyMember from "../../components/FamilyMember/FamilyMember";
import { useState } from 'react'
import { AuthContext } from "../../context/auth.context";
import { useContext } from "react";
import { useEffect } from "react";
import service from "../../services/file-upload.service";

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
  }, [])


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
    <div>
      {console.log("text", user.userPicture)}
      <h1>Hello {user.name.charAt(0).toUpperCase() + user.name.slice(1)}!</h1>
      <img src={imageUrl} alt={user.name} />
      <form> <input onChange={(e) => handleFileUpload(e)} type="file" />  </form>
      <h2> Hero Level: {user.rewards} Super Kid</h2>
      <h2> Week Perfomance: {user.kpi} 34,5 % </h2>
      <h1> Your {family.familyName.charAt(0).toUpperCase() + family.familyName.slice(1)} family members: </h1>
      <div className="family-member-container">
        {familyMember.map((eachFamilyMember, index) => {
          return (
            <FamilyMember
              key={eachFamilyMember._id}
              img={eachFamilyMember.userPicture}
              name={eachFamilyMember.name}
            />)
        })
        }
      </div>
    </div>
  );
}

export default ProfilePage;
