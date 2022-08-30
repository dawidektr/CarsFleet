const userController = require('../controllers/userController.js');

const UserRouter = require('express').Router();

UserRouter.post('/register', userController.register);
UserRouter.post('/login', userController.login);
UserRouter.post('/auth',  userController.auth);
UserRouter.post('/logout',  userController.logout);



module.exports = UserRouter; 