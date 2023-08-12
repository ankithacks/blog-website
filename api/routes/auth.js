const router=require('express').Router();
const User=require('../models/User');
const bcrypt=require('bcrypt');

// REgister
// in POSTMAN we do:- localhost:5000/api/auth/register and in the raw tab we do:-{
    // "username":"new1",
    // "email": "new@gmail.com",
    // "password":"123"
// }   and then having the POST, we send it and it gets saved in the database of "users"

router.post('/register', async (req, res)=>{
    try {


        const salt= await bcrypt.genSalt(10);
        const hashedPass= await bcrypt.hash(req.body.password, salt);
        const newUser= new User({
            username: req.body.username,
            email: req.body.email,
            // password: req.body.password  -->this was before using bcrypt
            password: hashedPass
        })

        const user =await newUser.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
})


// login
// in POSTMAN we do :- localhost:5000/api/auth/login using POST request and in raw section we write:- {
    // "username":"new1",
    // "password":"123"
// }  and press send....if the user is present then it will show the user present of the database....and if not then wrong credentials are shown
router.post('/login', async(req,res)=>{
    try {
        const user=await User.findOne({"username": req.body.username})
        if(!user){
            return res.status(400).json("wrong credentials");
        }
        
        const validated=await bcrypt.compare(req.body.password, user.password)
        if (!validated) {
            return res.status(400).json("wrong credentials");
        }
        
        const {password, ...others} = user._doc;
        return res.status(200).json(others);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
})

module.exports =router


