import "./ProfilePage.css";
import FamilyMember from "../../components/FamilyMember/FamilyMember";
import { useState } from 'react'

const familyMembersData = [
  { _id: 1234, name: "Mario", img: "https://gravatar.com/avatar/865fdc42701e4d2f15599a6f1d34df6e?s=400&d=robohash&r=x" },
  { _id: 2454, name: "Lisa", img: "https://gravatar.com/avatar/865fdc42701e4d2f15599a6f1d34df6e?s=400&d=robohash&r=x" }
]
function ProfilePage() {
  const [familyMember, setfamilyMember] = useState(familyMembersData)

  return (
    <div>
      <h1>Profile page</h1>
      <div className="family-member-container">
            {familyMember.map((eachFamilyMember, index) => {
              return (
                <FamilyMember
                _id={eachFamilyMember._id}
                img={eachFamilyMember.img}
                name={eachFamilyMember.name}
                />)
            })
            }
          </div>
    </div>
  );
}

export default ProfilePage;
