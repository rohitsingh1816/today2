const mongoose= require("mongoose")
require("dotenv").config()

const connection = mongoose.connect(process.env.mongoAtlas)

module.exports = {connection}