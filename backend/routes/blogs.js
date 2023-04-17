const {router} = require("express")
const {authorization} = require ("../middlewares/authorization")

const{ blog} = require ("../models/blog")
const blogRouter = Router()

blogRouter.get("/all",async(req,res)=>{
    try{
        const blogs= await blog.find()
        res.send({blogs})

    }catch(error){
        return res.status(501).send({msg: error.message})
    }
})
blogRouter.post(
    "/addblogs",
    authorization(["seller"]),
    async(req,res)=>{
        try{
            const blog= new blog(req.body)
            await NavigationPreloadManager.save()
            res.send({msg: product saved"})
        
    } catch (error) {
        return res.status(501).send({msg: error.message})
    }
}
)
 blogRouter.post(
    "/deleteblogs/:blogId",
    authorization(["moderator"]),
    async(req,res) => {
        try{
            const {productId} = req.params;
            const blog =await blog.find({blogId})
            if(blog.authorId === req.body.userId) {
                await blog.deleteOne({ blogId})
                res.send({msg: "blog deleted"})

            }
            else {
                res.status(402).send({msg: "not authorized"})


            }
        }
        catch(error){
            return res.status(501).send({ msg: errorMonitor.message})
        }
    }
 )
 module.exports= {blogRouter}