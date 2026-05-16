const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = process.env.JWT_SECRET;
//Route 1: Create a user using api/auth/createuser
router.post('/createuser',[
    body('name','Enter a valid name').isLength({min: 3}),
    body('email','Enter a Valid Email').isEmail(),
    body('password','Enter atleast 5 character password').isLength({min: 5}),
],async (req,res)=>{
    let success=false;
    console.log(req.body);
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success,errors:errors.array()});
    }
    //whether the user with same email exists already
    try{
       let user  = await User.findOne({success,email: req.body.email});
    if (user){
        return res.status(400).json({error:"Sorry, A user with same email already exists"});
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    user = await User.create({
        name:req.body.name,
        password:secPass,
        email:req.body.email
    });
    const data = {
        user:{
            id:user.id
        }
    }
    const authtoken =  jwt.sign(data,JWT_SECRET);
    success=true;
    res.json({success,authtoken}); 
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server error occured");
    }
    
})
//Route 2: Create a user using api/auth/login
router.post('/login',[
    body('email','Enter a Valid Email').isEmail(),
    body('password','Password Cannot be Blank').exists()
],async (req,res)=>{

    let success = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {email,password} = req.body;
    try{
       let user = await User.findOne({email});
       if(!user){
        return res.status(400).json({success,error:"Please Enter Correct Credentials"});
       }
       const passwordcomp = await bcrypt.compare(password,user.password);
       if(!passwordcomp){
        success=false;
        return res.status(400).json({success,error:"Please Enter Correct Credentials"});
       }
       const data = {
        user:{
            id:user.id
        }
    }
       const authtoken =  jwt.sign(data,JWT_SECRET);
       console.log(authtoken);
       success=true;
       res.json({success,authtoken}); 
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server error occured");
    }
})

//Route 3: Get logged in user details using post "/api/auth/getuser" Login required
router.post('/getuser',fetchuser,async (req,res)=>{
try{
   const userId = req.user.id;
   const user = await User.findById(userId).select("-password")
   res.send(user);
}catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server error occured");
    }
})
module.exports = router