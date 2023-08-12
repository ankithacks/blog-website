import './post.css';
import {Link} from "react-router-dom";

export default function Post({post}) {

  const PF="http://localhost:5000/images/";
  return (
        <div className="post">
            {post.photo && (
            <img 
            className='postImg' 
            src={PF+ post.photo} alt="" /> 
            )}
            <div className="postInfo">
                <div className="postCats">
                    {/* <span className="postCat">Music</span> */}
                    {/* <span className="postCat">Life</span> */}
                    {post.categories.map((c) => (
                        <span className="postCat">{c.name}</span>
                    ))}
                </div>
                <Link className='link' to={`/post/${post._id}`}>
                    <span className="postTitle">
                        {/* Lorem ipsum dolor sit amet consectetur adipisicing elit */}
                        {post.title}
                    </span>
                </Link>
                <hr />
                <span className="postDate">
                    {/* 1 hour ago ! */}
                    {new Date(post.createdAt).toDateString()}
                </span>
            </div>
            <p className='postDescription'>{post.desc}
                {/* Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque, dicta consectetur animi possimus cupiditate accusantium? Sequi at culpa laboriosam magni odio, similique architecto dicta a enim impedit adipisci. Obcaecati, ullam.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum ipsa tenetur, officiis hic rerum exercitationem inventore sit, illum corrupti provident vitae dolore? Nobis, nostrum in aperiam ex maxime labore iusto?
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo culpa natus pariatur, ducimus adipisci recusandae. Odit, facere laboriosam necessitatibus harum odio ad suscipit, similique ut, praesentium aliquid quam ullam est. */}
            </p>
        </div>
    )
}
