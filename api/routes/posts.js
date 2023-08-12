const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

// CREATE NEW POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json(error);
  }
  // in POSTMAN WE DO:-localhost:5000/api/posts/   and give a POST request and in raw we give info as :-{
  // "title":"new test alone",
  // "desc":"this is my final test of the api used",
  // "username":"ankitnew"
  // }  and then send it..it gets saved in the posts category of mongodb
});

// UPDATE THE POST
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      // this means its our own post hence we can update it
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body, //this means update everything inside the body
          },
          {
            new: true,
          }
        );
        res.status(200).json(updatedPost);
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json("you can update only your own post and not others");
    }
  } catch (error) {
    res.status(500).json(error);
  }
  //  in POSTMAN we do:-PUT method and write localhost:5000/api/posts/64cffe470267e02da77ce95f  this number is based on the id created previous create request or any id you want but it has to be from the mongodb database. in raw we write:-{
  // "title":"new test alone #updatesfirst time",
  // "desc":"this is my final test of the api used",
  // "username":"ankitnew"
  // }
});

// DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      // this means its our own post hence we can update it
      try {
        await post.deleteOne();
        res.status(200).json("post has been deleted");
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json("you can delete only your own post and not others");
    }
  } catch (error) {
    res.status(500).json(error);
  }
  // in POSTMAN we do:-DELETE method and write as localhost:5000/api/posts/64cffe470267e02da77ce95f
  // and press the send option. it gets deleted easily but yes in raw tab there must be present this :-{
  // "title":"new test alone #updatesfirst time",
  // "desc":"this is my final test of the api used",
  // "username":"ankitnew"
  // }
});

// Get POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all the posts available:-
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;

  try {
    let posts;
    if (username) {
      posts = await Post.find({ username: username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      // show all the posts
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
  // in POSTMAN we do:-localhost:5000/api/posts?user=new jane    and do a get request and it will get the search based on the user name given here it is new jane as the user was created with that name only before
});

// now to add image file in the blog we do first:- npm i multer

module.exports = router;
