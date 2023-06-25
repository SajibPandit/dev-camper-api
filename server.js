const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const connectDB = require('./config/db')
const colors = require('colors')
const errorHandler = require('./middlewares/error')

//Middlewares
const logger = require('./middlewares/logger')

//Route Files
const bootcampsRoute = require('./routes/bootcamps');

//Load env Variables
dotenv.config({path : './config/config.env'})
 
const app = express()

//body-parser
app.use(express.json())

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}
                                               
app.use('/api/v1/bootcamps',bootcampsRoute)

app.get('/',(req,res)=>{
    res.send('Hello From Express')       
})

app.use(errorHandler)

//Connect To Database
connectDB()

const PORT = process.env.PORT || 5000

const server = app.listen(PORT,()=>console.log(`Server Running in ${process.env.NODE_ENV} Mode on Port ${PORT} `.yellow.bold))

//Handle Unhandled Promise rejection
process.on('unhandledRejection',(err,promise)=>{
    console.log(`Error : ${err.message}`.red)
    //Colose Server and Exit Process
    server.close(()=>process.exit(1))
})