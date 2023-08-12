import { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import Posts from '../../components/posts/Posts';
import SideBar from '../../components/sidebar/SideBar';
import './Home.css';

// importing axios here:-
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export default function Home() {
  // lecture 3 below:-
  const [posts, setPosts]=useState([]);
  const {search}= useLocation();

  useEffect(()=>{
    const fetchPosts= async () =>{
      // go to package json and write "proxy" as written there
      const res= await axios.get("/posts"+search)
      console.log(res);
      setPosts(res.data);
    }
    fetchPosts();
  },[search])

   
  return (
    <>
      <Header />
      <div className="home">
          {/* <Posts/> */}
          <Posts posts={posts}/>
          <SideBar/>
      </div>
    </>
  )
}
// in third lecture we do :- npm i axios in the client folder itself