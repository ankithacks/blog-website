const router=require('express').Router();
const User=require('../models/User');
const bcrypt=require('bcrypt');
const Post=require('../models/Post');

// update the user-->to update we use the put method
router.put('/:id', async (req, res)=>{
    if(req.body.userId === req.params.id){
        if(req.body.password){
            const salt=await bcrypt.genSalt(10);
            req.body.password =await bcrypt.hash(req.body.password, salt);
        }
        try {
            const updatedUser=await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            },{new: true});
            res.status(200).json(updatedUser);
        } catch (error) {
            return res.status(500).json(error);
        }
    }else{
        res.status(401).json("you can update only your account")
    }
        
});

// delete the user
router.delete('/:id', async (req, res)=>{
    if(req.body.userId === req.params.id){
        // if(req.body.password){
        //     const salt=await bcrypt.genSalt(10);
        //     req.body.password =await bcrypt.hash(req.body.password, salt);
        // }
        try {
            const user= await User.findById(req.params.id);
            try {
               await Post.deleteMany({username: user.username})
               await User.findByIdAndDelete(req.params.id);
                res.status(200).json('user has been deleted');
            } catch (error) {
                return res.status(500).json(error);
            }
        } 
        catch (error) {
            res.status(404).json('no user exists')
        }
    }else{
        res.status(401).json("you can delete only your account")
    }
        
});

// Get user:-
router.get(':/id', async (req,res)=>{
    try {
        const user=await User.findById(req.params.id);
        const { password, ...others}= user._doc
        res.status(200).json(others)
    } catch (error) {
        res.status(500).json(error);
    }
})


module.exports =router


