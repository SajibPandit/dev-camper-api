const express = require('express');
const dotenv = require('dotenv')

//Load env Variables
dotenv.config({path : './config/config.env'})

const app = express()

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>console.log(`Server Running in ${process.env.NODE_ENV} Mode on Port ${PORT} `))