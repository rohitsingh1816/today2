const jwt = require ("jsonwebtoken")
const fs= require("fs")
const authenticator= async (req,res,next) +> {
    try{ const token = req?.headers?.authorization?.split(" ")[1]
if(!token){
    return res.status(401).send({msg: "please login"})

}
const blacklisteddata= JSON.parse(
    fs.readFileSync("./blacklist.json", "utf-8")
)
const isTokenBlacklisted= blacklisteddata.find(
    (b_token) => b_token== token
)
if(isTokenBlacklisted)
return res.status(402).send({"msg: please login"})

const isTokenValid= await jwt.verify(token,process.env.JWT_ACCESS_SECRET)
if(!isTokenValid)
return res
.status(402)
.send({msg: "authentication failed"})

req.body.userId= isTokenValid.userId;
req.body.email= isTokenValid.email;
req.body.role= isTokenValid.role;
next()
}
 catch(error){
    res.send({ msg: "please login",err: error message})

 }
}

module.exports = {authenticator}