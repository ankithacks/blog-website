import { useState } from "react";
import "./register.css";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [username, setUsername] =useState("")
  const [email, setEmail] =useState("")
  const [password, setPassword ] =useState("")
  const [error, setError]=useState(false);

  const handleSubmit=async (e)=>{
    e.preventDefault();
    setError(false);
    try {      
      const res= await axios.post("https://blog-website-statuscode0.onrender.com/api/auth/register", {
        username,
        email, 
        password,
      });
      console.log(res.data);
      res.data && window.location.replace("/login")
    } catch (error) {
      setError(true);
    }
  }

  return (
    <div className="register">
      <span className="registerTitle">
        <b>Register</b>
      </span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input className="registerInput" type="text" placeholder="enter your username" onChange={e=>setUsername(e.target.value)}/>
        <label>Email</label>
        <input className="registerInput" type="email" placeholder="email"  onChange={e=>setEmail(e.target.value)} />
        <label>Password</label>
        <input
          type="password"
          className="registerInput"
          placeholder="enter password"
          onChange={e=>setPassword(e.target.value)}
        />

        <button className="registerButton" type="submit">Register Now!!</button>
      </form>
      <button className="registerLoginButton"><Link className="link" to={"/Login"}>LOGIN</Link></button>
      {error && <span style={{color: "red", marginTop: "14px"}}>Something unfortunately went really wrong😕</span>}
    </div>
  );
}
