const express = require('express');
const bodyParser = require("body-parser");
require('dotenv').config({ path: '.env' });
const cookieParser = require("cookie-parser");
const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());


app.use( function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.header('Access-Control-Allow-Credentials', true);
    next();
});


const CarsRouter = require('./routes/carsRouter.js');
const UserRouter = require('./routes/userRouter.js');

app.use('/api/', CarsRouter);
app.use('/api/', UserRouter);

const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, "build")));
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
