import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import "./singlePost.css";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = "https://blog-website-statuscode0.onrender.com/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (error) {}
  };


  const handleUpdate= async ()=>{
    try {
      await axios.put(`/posts/${post._id}`, {
        username: user.username, title, desc
      });
      // window.location.reload();   you culd keep this also if you want or do as:-
      setUpdateMode(false);

    } catch (error) {}
  };
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img src={PF + post.photo} alt="" className="singlePostImg" />
        )}
        {updateMode ? (
          <input type="text" value={title} className="singlePostTitleInput" autoFocus onChange={(e)=>setTitle(e.target.value)}/>
        ) : (
          <h1 className="singlePostTitle">
            {/* {post.title} this is to be written when window.reload is there else write:- */}
            {title}
            {/* Lorem ipsum dolor sit amet consectetur adipisicing eli */}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon fa-solid fa-pen-to-square"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon fa-solid fa-trash"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <Link to={`/?user=${post.username}`} className="link">
              <b>{post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (<textarea className="singlePostDescInput" value={desc} onChange={(e)=>setDesc(e.target.value)}/>) : (

          // <p className="singlePostDesc">{post.desc}</p>  write this when window.reload is written else write it as:-
          <p className="singlePostDesc">{desc}</p>

        ) } 

        {updateMode && (
          
          <button className="singlePostButton" onClick={handleUpdate}>
          Update
          </button>
        )}
      </div>
    </div>
  );
}
