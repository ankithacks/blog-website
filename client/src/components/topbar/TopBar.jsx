import { useContext } from "react";
import "./TopBar.css";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";

export default function Topbar() {
  
  const {user, dispatch}= useContext(Context);
  const PF="http://localhost:5000/images/"


  // const user=false;
  // false means NO user is logged into
  const handleLogout=()=>{
    dispatch({type:"LOGOUT"})
  }
  
  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to={"/"} >HOME</Link>
          </li>
          <li className="topListItem"><Link className="link" to={"/"} >ABOUT</Link></li>
          <li className="topListItem"><Link className="link" to={"/"} >CONTACT</Link></li>
          <li className="topListItem"><Link className="link" to={"/write"} >WRITE</Link></li>
          <li className="topListItem" onClick={handleLogout}>
            {/* <Link className="link" to={"/"} > */}
              {user && "LOGOUT"}
              {/* this above line means that if there is a user logged in then only show else nope */}
            {/* </Link> */}
          </li>
        </ul>
      </div>
      <div className="topRight">
        {
          user ? (
            <Link to="/settings">
            

              <img
                className="topImg"
                // src="https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"  pasted this in the database only directly
                src={PF+ user.profilePic}
                alt=""
              /> 
            </Link>
          ) : (
            <ul className="topList">
              <li className="topListItem">
                <Link className="link" to={"/Login"}>LOGIN</Link>
              </li>
              <li className="topListItem">
                <Link className="link" to={"/Register"}>REGISTER</Link>
              </li>
            </ul>
          )
        }
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
}
