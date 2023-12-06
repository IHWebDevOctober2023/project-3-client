import "./SignupPage.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handlePic = (e) => setPic(e.target.value);
  const handleAge = (e) => {
    setAge(e.target.value)
  };
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    let role;
    Number(age) > 18 ? role = "Parent" : role = "Child";
    const requestBody = { email, password, name, role, age: Number(age) };
    authService
      .signup(requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="signup-page">
      <h1>Sign Up</h1>
      <form className="form-container" onSubmit={handleSignupSubmit}>
        <label>Email:</label>
        <input className="input" type="email" name="email" value={email} onChange={handleEmail} />
        <label>Password:</label>
        <input className="input" type="password" name="password" value={password} onChange={handlePassword} />
        <label>Name:</label>
        <input className="input" type="text" name="name" value={name} onChange={handleName} />
        <label>Age:</label>
        <input className="input" type='number' name="age" value={age} onChange={handleAge} />
        <button type="submit" className="btn-icon"><i class="fa-solid fa-user-plus"></i></button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <p className="text-p">Already have account?</p>
      <Link to={"/login"}> Login</Link>
    </div>
  );
}

export default SignupPage;
