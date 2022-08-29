const express = require('express');

require('dotenv').config({ path: '.env' });
const cookieParser = require("cookie-parser");

const app = express();

app.use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    next();
});

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


const CarsRouter = require('./routes/carsRouter.js');
const UserRouter = require('./routes/userRouter.js');

app.use('/api/', CarsRouter);
app.use('/api/', UserRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
