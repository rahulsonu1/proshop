import asyncHandler from "express-async-handler";
import User from "../model/user.js";
import bcrypt from "bcryptjs";
import generateToken from "../config/generateToken.js";


const login = asyncHandler(async (req, res) => {
  
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const isPasswordSame=await bcrypt.compare(password, user.password)
  console.log(isPasswordSame)
  if (user && isPasswordSame) {
    return res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    return res.json({
      id: user._id,
      user: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

const register=asyncHandler(async(req,res)=>{
   const {name,email,password}=req.body
   const userExist=await User.findOne({email})
   if(userExist){
    res.status(404)
    throw new Error("User already exists")
   }
  
   const user=await User.create({
    name,email,password
   })
   if(user){
    res.status(201).json({
        id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
        token:generateToken(user._id)
    })
   }else{
    res.status(400)
    throw new Error("Invalid user data")
   }
})

export default { login, getUserProfile,register };
