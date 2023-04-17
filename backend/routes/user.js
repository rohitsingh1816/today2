const {Router} = require("express")
const {User} = require(" ../models/user")
const fs= require("fs")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const userRouter = Router()

userRouter.post("/signup",async(req,res)=>{
    try{
        const{email,password,name,role} =req.body;
        const isUserPresent = await User.findOne({email})
        if(isUserPresent) return res.send("user present,login please")
        const hash= await bcrypt.hashSync(password,4)
        const newUser= new User ({ name,email,password,hash,role})
        await newUser.save()

        res.send("signup succesful")
    } catch(error){
        res.send(error.message)
    }
})

userRouter.post ("/login", async(req,res) => {
    try{
        const{email,password} =req.body;
        if(!email || !password) return res.status(401).send ({msg:"put valid email"})
        const isUserPresent = await User.findOne({email})
        if(!isUserPresent) return res.send("user not present")
        const isPasswordcorrect= await bcrypt.compareSync(
            password,
            isUserPresent.password
        )
        if(!isPasswordcorrect) return res.send("invalid credentials")
        const token await jwt.sign(
            {
                email,userId: isUserPresent._id },
                process.env.JWT_ACCESS_TOKEN,
                {expiresIn: "1m"}
            
        );
        const refreshToken = await jwt.sign(
            {email,userId:isUserPresent._id},
            process.env.JWT_REFRESH_SECRET,
            {expiresIn : "3m"}
        )
        res.send({ msg: 'Login sucess', token, refreshToken})
    }
    catch(error){
        res.send(error.message)
    }
})


userRouter.get ("/getnewtoken", (req,res) => {

        const refreshtoken = req.headers.authorization.split(" ")[1]
      
        if(!refreshToken) return res.send({msg: "please login"})
      jwt.verify(refreshtoken,process.env.JWT_REFRESH.SECRET,(err,decoded) => {
        if(err) return res.send({msg:"please login"})
        else {
            const token= jwt,sign (
                {userId: decoded.userId,email: decoded.email},
                process.env.JWT_ACCESS_SECRET,
                {
                    expiresIn: "1m" }
                
            )
            res.send({msg:"Login success",token})
        }
      })
    })

    userRouter.get("/logout", (req,res) => {
        try{
            const token = req?.headers?.authorization?.split(" ")[1]
            
            const blacklisteddata= JSON.parse(
                fs.readFileSync("./blacklist.json",JSON.stringify(blacklisteddata))
                res.send("logout success")
            } catch(error) {
                res.send(error.message)
            }  
            
    })

    module.exports= {userRouter}