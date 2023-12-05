import "./FamilyMember.css";

function FamilyMember(props) {
  return (
    <section className="container-family-member">
      <div className="family-member-card">
        <img className="family-member-img" src={props.img} alt={props.name} />
        <h2>{props.name}</h2>
        <p>{props.age} years</p>
        <p>{props.role} </p>
      </div>
    </section>
  )
}
export default FamilyMember