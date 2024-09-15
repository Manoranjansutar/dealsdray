import userModels from "../models/userModels.js"
import jwt from 'jsonwebtoken'
import 'dotenv/config'

//fuation to add user/register
const registerController = async(req,res)=>{
    const { username, email, password } = req.body;
   console.log(req.body)
   try {
    const isExist = await userModels.findOne({email})
   if(isExist){
      return  res.json({
        success:false,
        message:"Email Already Exist"
      })
   }

   const newUser = new userModels({
      username,
      email,
      password
   })

   await newUser.save()
   
   return res.json({
      success:true,
      message:"User Register Successfully!!!"
   })
   } catch (error) {
      console.log(error)
      return res.json({
         success:false,
         message:"Something went wrong"
      })
   }
}

//function to create token
const createToken = (id) =>{
   console.log(process.env.SECRET_KEY)
    return jwt.sign({id},process.env.SECRET_KEY)
}

//function to login
const loginController = async(req,res)=>{
   const {email, password} = req.body;
   console.log(req.body)
   try {
     const user = await userModels.findOne({email})
     if(!user){
        return res.json({
           success:false,
           message:"User not found"
        })
     }
     if(user.password !== password){
        return res.json({
           success:false,
           message:"Wrong password"
        })
     }
   const token = createToken(user._id)

     return res.json({
        success:true,
        token:token,
        username:user.username,
        message:"Login Successfully!!!",
     })
   } catch (error) {
      console.log(error)
      return res.json({
         success:false,
         message:"Something went wrong"
      })
   }
}

export {registerController, loginController}