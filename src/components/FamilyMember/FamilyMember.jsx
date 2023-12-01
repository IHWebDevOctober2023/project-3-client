import "./FamilyMember.css";

function FamilyMember(props) {
    return(<div className="family-member-card">
              <img className="family-member-img" src={props.img} alt={props.name} />
              <h2>{props.name}</h2>
  </div>)
}
export default FamilyMember