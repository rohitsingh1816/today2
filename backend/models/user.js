const mongoose= require("mongoose")
const bcrypt = require("bcrypt")

const useSchema= mongoose.Schema({
    name : {type: string, require:true},
    email: { type:string , require:true},
    password : { type :string, require:true},
    role: { type:string, enum: ["User", "Moderator"],default:"User"},
})
const User = mongoose.model("user", UserSchema)
module.exports= {User}