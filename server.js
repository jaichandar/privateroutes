const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')
const routers = require('./routes/route')



const app = express()
dotenv.config()

app.use(express.json())
app.use(cors())
app.options('*',cors())
if(process.env.project === 'development'){
    app.use(morgan('dev'))
}

app.use('/api',routers)

mongoose.connect(process.env.MONGOURL,{
    useCreateIndex:true,
    useFindAndModify:false,
    useNewUrlParser:true,
    useUnifiedTopology:true
},(err)=>{
    if(err){
        console.log(`err ${err}`)
    }else{
        console.log('db connected')
    }
})


const PORT = process.env.PORT || 9090
const server = app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
})


process.on('unhandledRejection',(err)=>{
    console.log(`err ${err}`)
    server.on(process.exit(1))
})
