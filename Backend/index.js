const express = require("express")

const JWT=require("jsonwebtoken")
const dotenv = require("dotenv")
const morgan = require('morgan')
const connectDb = require("./config/db.config.js")
const router = require("./routers/authRoute.js")
const categoryRouter=require("./routers/categoryRoute.js")
const productRouter=require("./routers/productRoute.js")
const cors=require("cors")
//configure env
dotenv.config()

//database config
connectDb()

//rest object
const app = express()

//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))


//routes
app.use("/api/v1/auth", router)
app.use("/api/v1/category",categoryRouter)
app.use("/api/v1/product",productRouter)


//rest api
app.get("/", (req, res) => {
    res.send("hello")
})
//Port
const port = process.env.PORT 

app.listen(port, () => {
    console.log(`app is running in port ${port}`)
})