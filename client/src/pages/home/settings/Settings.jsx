import { useContext, useState } from 'react';
import SideBar from '../../../components/sidebar/SideBar';
import './settings.css';
import { Context } from '../../../context/Context';
import axios from 'axios';

export default function Settings() {
  
  const [file, setFile]=useState(null);
  const [username, setUsername]=useState("");
  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");
  const [success, setSuccess]=useState(false);
    
  const {user, dispatch }=useContext(Context);
  const PF="http://localhost:5000/images/" 

  const handleSubmit=async (e)=>{
    e.preventDefault();
    dispatch({type:"UPDATE_START"})
    const updatedUser={
      userId: user._id,
      username,email,password
    };
    if(file){
      const data=new FormData();
      const filename=Date.now() +file.name;
      data.append("name",filename);
      data.append("file",file);
      updatedUser.profilePic= filename;
      try {
        await axios.post("/upload", data)
      } catch (error) {
        console.log(error);
      }
    }
    try {

        const res= await axios.put("/users/"+user._id, updatedUser);
        setSuccess(true);
        dispatch({type:"UPDATE_SUCCESS", payload:res.data})
    } catch (error) {
        dispatch({type:"UPDATE_FAILURE"})
    }
  };
  return (
        <div className="settings">
            <div className="settingWrapper">
                <div className="settingTitle">
                    <span className="settingUpdateTitle">
                        Update Your account
                    </span>
                    <span className="settingDeleteTitle">
                        Delete your account
                    </span>
                </div>
                <form className="settingForm" onSubmit={handleSubmit}>
                    <label>Profile Picture</label>
                    <div className="settingPP">
                        <img src={file ? URL.createObjectURL(file) : PF+user.profilePic} alt="" srcset="" />
                        <label htmlFor="fileInput">
                        <i className="settingsPPIcon fa-solid fa-user"></i>
                        </label>
                        <input type="file" id='fileInput' style={{display: 'none'}} onChange={(e)=>setFile(e.target.files[0])}/>
                    </div>
                    <label >Username</label>
                    <input type="text" placeholder={user.username} onChange={e=>setUsername(e.target.value)} />
                    <label >Email</label>
                    <input type="Email" placeholder={user.email} onChange={e=>setEmail(e.target.value)} />
                    <label >Password</label>
                    <input type="password" onChange={e=>setPassword(e.target.value)}/>
                    <button className="settingSubmit" type="submit">Update now</button>
                    {success && (<span style={{color: "green" , textAlign: "center", marginTop:"15px"}}>profile updated successfully</span>)}
                </form>
            </div>
            <SideBar />
        </div>
    )
}
