import "./ProfilePage.css";
import FamilyMember from "../../components/FamilyMember/FamilyMember";
import { useState } from 'react'
import { AuthContext } from "../../context/auth.context";
import { useContext } from "react";
import { useEffect } from "react";

const familyMembersData = [
  { _id: 1234, name: "Mario", img: "https://gravatar.com/avatar/865fdc42701e4d2f15599a6f1d34df6e?s=400&d=robohash&r=x" },
  { _id: 2454, name: "Lisa", img: "https://gravatar.com/avatar/865fdc42701e4d2f15599a6f1d34df6e?s=400&d=robohash&r=x" }
]
function ProfilePage() {
  const [familyMember, setfamilyMember] = useState([])
  const { user, family } = useContext(AuthContext);

  const getFamilyId = async (event) => {
    try {
      const familyMembersResponse = await fetch(`${import.meta.env.VITE_SERVER_URL}/family/familymembers/${family._id}`)
      const familyMembers = await familyMembersResponse.json()
      console.log(familyMembers);
      setfamilyMember(familyMembers)
    } catch (error) { console.log(error);}
  }
  useEffect(()=>{
    getFamilyId()
  },[])

  return (
    <div>
      {console.log(user, family)}
      <h2 className="text-profile">Hello {user.name.charAt(0).toUpperCase() + user.name.slice(1)}!</h2>
      <img src={user.userPicture} alt={user.name} />
      <h3 className="text-profile">These are the members of the {family.familyName.charAt(0).toUpperCase() + family.familyName.slice(1)} family: </h3>
      <div className="profile-page-container">
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
