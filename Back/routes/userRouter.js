// import controllers review, products
const userController = require('../controllers/userController.js');



// router
const UserRouter = require('express').Router();


// use routers
UserRouter.post('/register', userController.register);
UserRouter.post('/login', userController.login);
UserRouter.post('/auth', userController.validateToken, userController.auth);



module.exports = UserRouter; 