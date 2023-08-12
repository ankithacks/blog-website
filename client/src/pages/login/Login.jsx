import { useContext, useRef } from 'react';
import './login.css';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import axios from 'axios';

export default function Login() {

    const userRef= useRef();
    const passwordRef= useRef();

    const { dispatch, isFetching }= useContext(Context);

    const handleSubmit= async (e)=>{
        e.preventDefault();
        dispatch({type:"LOGIN_START"});
        try {
            const res =await axios.post("https://blog-website-statuscode0.onrender.com/api/auth/login", {
                username: userRef.current.value,
                password: passwordRef.current.value,
            })
            dispatch({type:"LOGIN_SUCCESS", payload:res.data})
        } catch (error) {
            dispatch({type:"LOGIN_FAILURE"})
            
        }
    };
  return (
        <div className="login">
            <span className='loginTitle'><b>Login</b></span>
            <form className="loginForm" onSubmit={handleSubmit}>
                <label>Username</label>
                <input className='loginInput' type="text" placeholder='enter your username..' 
                ref={userRef}/>
                <label>Password</label>
                <input type="password" className= "loginInput" placeholder='enter password'ref={passwordRef}/>

                <button className='loginButton' type='submit' disabled={isFetching}>Login Button</button>
            </form>
            <button className='loginRegisterButton'><Link className='link' to={"/Register"}>Register</Link></button>
            
        </div>
    )
}
