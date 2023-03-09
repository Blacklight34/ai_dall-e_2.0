import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()
import dalleRoutes from './routes/dalleRoutes.js'


const app = express();
app.use(cors())
app.use(express.json({limit: '50MB'}))
app.use("/api/v1/dalle", dalleRoutes)

const connectMongo = () => {
    mongoose.set('strictQuery', true);
    mongoose.connect("mongodb://127.0.0.1:27017/dalle",{useNewUrlParser: true})
    const db = mongoose.connection;
    db.on("error",(error)=>{
        console.log(error)
    })
    db.once("connected",()=>{
        console.log("Database Connected")
    })
}

app.listen(3000, ()=>{
    try{
        connectMongo()
        console.log("Port Listening on: " + 3000)
    }
    catch(err){
        console.log(err)
    }
})