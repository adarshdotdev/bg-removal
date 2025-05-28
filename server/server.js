import "dotenv/config"
import express from 'express'
import cors from 'cors'
import connectDB from "./configs/mongodb.js"
import userRouter from "./routes/userRoutes.js"


// App config
const PORT = process.env.PORT || 4000
const app = express()
await connectDB()

// Initialise middlewares 
app.use(express.json())
app.use(cors())



// Api route 
app.get("/", (req, res) => {
    res.send("API working.")

})
app.use("/api/user", userRouter)

app.listen(PORT, () => console.log("Server running on port: ", PORT))