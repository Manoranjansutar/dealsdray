import express from 'express'
import cors from 'cors'
import { connectDB } from './config/DB.js'
import userRouter from './routes/userRouter.js'
import employeeRouter from './routes/employeeRouter.js'

const app = express()
app.use(express.json())
app.use(cors())

connectDB();

const PORT = 5000

app.use('/api/user',userRouter)
app.use('/api/employee',employeeRouter)
app.use('/images' , express.static('uploads'))

app.get("/" , (req,res)=>{
    res.send("API is running")
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})
