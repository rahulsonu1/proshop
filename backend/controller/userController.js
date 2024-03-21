import asyncHandler from "express-async-handler";
import User from "../model/user.js";
import bcrypt from "bcryptjs";
import generateToken from "../config/generateToken.js";


const login = asyncHandler(async (req, res) => {
  
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  
  
  if (user && await bcrypt.compare(password, user.password))  {
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
      name: user.name,
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

const updateUserProfile=asyncHandler(async (req,res)=>{
  const user=await User.findById(req.user._id)
  if(user){
    user.name=req.body.name||user.name,
    user.email=req.body.email||user.email
    if(req.body.password){
      user.password=req.body.password
    }
    const updatedUser=await user.save()
    return res.json({
      id: updatedUser._id,
      name: updatedUser.name,
      email:updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token:generateToken(updatedUser._id)
    });

  }else{
    res.status(404)
    throw new Error('User Not Found')
  }
})

const getUser=asyncHandler(async (req,res)=>{
  const user=await User.find()
  res.json(user)
})

const deleteUser=asyncHandler(async(req,res)=>{
  const user=await User.findByIdAndDelete(req.params.id)
  if(user){
    await user.remove()
    res.json({message:'User removed'})
  }else{
    res.status(404)
    throw new Error('User not found!')
  }
})

const getUserById =asyncHandler(async(req,res)=>{
  const user=await User.findById(req.params.id).select('-password')
  if(user){
    res.json(user)
  }else{
    res.status(404)
    throw new Error('User not found')
  }
})

const  updateUser=asyncHandler(async(req,res)=>{
  const user=await User.findById(req.params.id)
  if(user){
    user.name=req.body.name||user.name,
    user.email=req.body.email||user.email,
    user.isAdmin=req.body.isAdmin

    const updatedUser=await user.save()
    res.json({
      id: updatedUser._id,
      name: updatedUser.name,
      email:updatedUser.email,
      isAdmin: updatedUser.isAdmin,
       
    })
  }else{
    res.status(404)
    throw new Error('User not found')
  }
})

export default { login, getUserProfile,register,updateUserProfile,getUser,deleteUser,getUserById,updateUser };
