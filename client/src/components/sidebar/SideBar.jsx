import axios from "axios";
import { useEffect, useState } from "react";
import "./SideBar.css";
import {useLocation} from "react-router-dom";
import { Link } from "react-router-dom";

export default function SideBar() {
  const [cats,setCats ]=useState([]);
  const location= useLocation();
  console.log(location);
  useEffect(()=>{
    const getCats = async () =>{
      const res= await axios.get("/categories")
      setCats(res.data) 
    }
    getCats();
  },[])
  return (
    <div className="sideBar">
      <div className="sideBar-Item">
        <span className="sideBarTitle"><b>CREATOR INFO:-</b></span>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRBxi3EXxlpD2LGk3jB51C8YhsnUiNuYkSDr9JL8nu&s" alt="" />
        <p>
            Hi there folks...My name is <b>ANKIT CHAKRABORTY</b> and I try to develop as much full stack WEB apps using different tech stacks and present scenarios of the market. Do check this website of blog.😊
        </p>
      </div>
      <div className="sideBarItem">
        <span className="sideBarTitle">CATEGORIES</span>
        <ul className="sideBarList">
          {cats.map((c)=>(
            <Link to={`/?cat=${c.name}`} className="link">
              <li className="sideBarListItem">{c.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sideBarItem">
        <span className="sideBarTitle">Follow Us</span>
        <div className="sideBarSocial">
          <i className="sideBarIcon fab fa-facebook-square"></i>
          <i className="sideBarIcon fab fa-instagram-square"></i>
          <i className="sideBarIcon fab fa-pinterest-square"></i>
          <i className="sideBarIcon fab fa-twitter-square"></i>
        </div>
      </div>
    </div>
  );
}
