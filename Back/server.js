const express = require('express')
// const cors = require('cors')
require('dotenv').config({ path: '.env' })
const cookieParser = require("cookie-parser");

const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());


const CarsRouter = require('./routes/carsRouter.js')
const UserRouter = require('./routes/userRouter.js')

app.use('/api/', CarsRouter)
app.use('/api/', UserRouter)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})
