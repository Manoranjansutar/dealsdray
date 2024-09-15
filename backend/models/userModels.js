import mongoose from "mongoose";

const userSChema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const userModels = mongoose.model("users",userSChema) || mongoose.model("users")

export default userModels