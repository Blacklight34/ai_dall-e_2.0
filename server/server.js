import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
dotenv.config()
import dalleRoutes from './routes/dalleRoutes.js'


const app = express();
app.use(cors())
app.use(express.json({limit: '50MB'}))
app.use("/api/v1/dalle", dalleRoutes)
app.get('/', async (req, res) => {
    res.status(200).json({
      message: 'Hello from DALL.E!',
    });
  });

app.listen(3000, ()=>{
    try{
        console.log("Port Listening on: " + 3000)
    }
    catch(err){
        console.log(err)
    }
})