import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import errorMiddleware from './middlewares/error-middleware.js'
import router from './router/router.js'

const PORT = process.env.PORT || 3001
const MONGO_URL = process.env.MONGO_URL

const app = express()
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true 
}))
app.use('/api', router)
app.use(errorMiddleware)



const start = async () => {
    try {
        await mongoose.connect(MONGO_URL)
        app.listen(PORT, () => console.log(`server started on port: ${PORT}`))
    } catch (err) {
        console.log(err)
    }
}

start()
