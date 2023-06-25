const mongoose = require('mongoose')
const colors = require('colors')
const dotenv = require('dotenv')
const fs = require('fs')
//Load env Variables
dotenv.config({path : './config/config.env'})


//Load models
const Bootcamp = require('./models/Bootcamp')

mongoose.connect(process.env.MONGO_URI,{useCreateIndex:true,useFindAndModify:true,useFindAndModify:false,useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    const bootcamps = JSON.parse(
        fs.readFileSync(`${__dirname}/_data/bootcamps.json`,'utf-8')
    )
    const importData = async()=>{
        try {
            await Bootcamp.create(bootcamps)
            console.log(`Data Imported`.green.inverse)
            process.exit()
        } catch (error) {
            console.log(error)
        }
    }
    
    const deleteData = async()=>{
        try {
            await Bootcamp.deleteMany()
            console.log(`Data Deleted`.red.inverse)
            process.exit()
        } catch (error) {
            console.log(error)
        }
    }
    
    if(process.argv[2] === '-i'){
        importData()
    }
    else if(process.argv[2] === '-d'){
        deleteData()
    }
})
.catch(err =>console.log(err))


