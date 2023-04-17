const mongoose = require("mongoose")
 const blogSchema = mongoose.Schema({
    title: { type: string, required:true},
    blogId: { type: string, required:true},
    authorId : { type: string, required:true},

 })

 const blog= mongoose.model ("blog",blogSchema)
 module.exports= {blog}