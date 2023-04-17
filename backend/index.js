const express = require ("express")
const {connection} = require("./config/db")
const {authenticator} = require("./middlewares/authentication")
const {userRouter} = require("./routes/user")
const jwt= require("jsonwebtoken")
const {user} =require{ ./models/user"}
const {authorization} = require("./middlewares/authorization")
const { blogRouter } = require("./routes/blogs")

require("dotenv").config()

const port= process.env.PORT || 5500

const app= express()

app.use(express.json())

app.get("/", (req,res) => {
    res.send("Created")
})

app.use("/user", userRouter)
app.use(authenticator)
app.use("/blogs", productRouter)

app.listen(port,async () => {
    try{
        await connection;
        console.log("Connected to DB")
    } catch(error){
        console.log("unable to connect")
    }
})


