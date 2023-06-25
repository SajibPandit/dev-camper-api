const mongoose = require('mongoose')

const connectDB = async() => {
    const conn = await mongoose.connect(process.env.MONGO_URI,{useCreateIndex:true,useFindAndModify:true,useFindAndModify:false,useNewUrlParser:true,useUnifiedTopology:true})

    console.log(`Mongodb Connected : ${conn.connection.host}`.bgBlue.cyan.bold)
}

module.exports = connectDB